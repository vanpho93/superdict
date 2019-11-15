import { defaultTo, random } from 'lodash'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { FetchService } from '../../services'
import { map, mergeMap, catchError, withLatestFrom, tap, first, switchMap } from 'rxjs/operators'
import { VocabularyService } from '../vocabulary/vocabulary.service'
import { clearSelectedVocabularies, fetchVocabularies } from '../vocabulary/vocabulary.action'
import { Store, select } from '@ngrx/store'
import { State } from '..'
import { ReviewState, EReviewStep, IReviewingVocabulary } from './review.metadata'
import {
  fetchListReviewingVocabularySuccess, sendAnswer, sendAnswerSuccess, startReviewing,
  goToSecondPart, goToNextVocabulary, goToReport, skipVocabulary, sendSubmitReportRequest,
  sendSubmitReportSuccess, resetReport,
} from './review.action'
import { NzMessageService } from 'ng-zorro-antd/message'

@Injectable()
export class ReviewEffects {
  fetchVocabularies$ = createEffect(() => {
    const selectedVocabularyIds$ = this.store.pipe(select('vocabulary'), select('selectedVocabularyIds'))
    const filterByActionType = ofType(startReviewing)
    const fetchVocabulary$ = this.actions$.pipe(filterByActionType, map(() => 1))
    return fetchVocabulary$.pipe(
      withLatestFrom(selectedVocabularyIds$),
      mergeMap(([_, vocabularyIds]) => this.vocabularyService.fetchVocabularies({ vocabularyIds, pageSize: 200 })
        .pipe(
          map(({ vocabularies }) => (fetchListReviewingVocabularySuccess({ vocabularies }))),
          catchError(() => EMPTY)
        )
      ),
    )
  })

  answer$ = createEffect(() => this.actions$.pipe(
    ofType(sendAnswer),
    tap(({ answer }) => this.onAnswerWord(answer))
  ), { dispatch: false })

  nextStep$ = createEffect(() => {
    const reviewState$ = this.store.select('review')
    const filterByActionType = ofType(sendAnswerSuccess, fetchListReviewingVocabularySuccess, goToSecondPart, skipVocabulary)
    const nextStepActions$ = this.actions$.pipe(filterByActionType)
    return nextStepActions$.pipe(
      withLatestFrom(reviewState$),
      map(([_, reviewState]) => this.getNextStep(reviewState))
    )
  })

  submitReport$ = createEffect(() => {
    const vocabularies$ = this.store.pipe(select('review'), select('state'))
    const filterByActionType = ofType(sendSubmitReportRequest)
    return this.actions$.pipe(
      filterByActionType,
      withLatestFrom(vocabularies$),
      switchMap(([_, vocabularies]) => this.fetch.post('/exam-result', {
          result: vocabularies.map((vocabulary: IReviewingVocabulary) => ({
            vocabularyId: vocabulary.vocabularyId,
            performanceRating: 1,
          }))
        }).pipe(map(() => sendSubmitReportSuccess()))
      ),
    )
  })

  finishReview$ = createEffect(() => this.actions$.pipe(
    ofType(sendSubmitReportSuccess),
    map(() => resetReport()),
    tap(() => this.onResetReport())
  ))

  clearSelectedVocabularies$ = createEffect(() => this.actions$.pipe(
    ofType(resetReport),
    map(() => clearSelectedVocabularies()),
  ))

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private vocabularyService: VocabularyService,
    private fetch: FetchService,
    private message: NzMessageService,
    private router: Router,
    ) {}

  private async playSound(path: string) {
    try {
      await new Audio(path).play();
    } catch (error) {
      return null
    }
  }

  async onAnswerWord(answer: string) {
    const RIGHT_ANSWER_SOUND = 'https://s3.amazonaws.com/freesoundeffects/mp3/mp3_477620.mp3'
    const WRONG_ANSWER_SOUND = 'https://s3.amazonaws.com/freesoundeffects/mp3/mp3_56054.mp3'
    this.store.select('review').pipe(first(), tap(async ({ currentIndex, state: vocabularies, step }) => {
      const { word, americanSound, britishSound, meaning } = vocabularies[currentIndex]
      const isRight = step === EReviewStep.FIRST_PART ? word === answer : meaning === answer
      if (isRight) {
        await this.playSound(RIGHT_ANSWER_SOUND)
        await this.playSound(`http://dictionary.cambridge.org${defaultTo(americanSound, britishSound)}`)
      } else {
        await this.playSound(WRONG_ANSWER_SOUND)
      }
      this.store.dispatch(sendAnswerSuccess({ isRight }))
    })).subscribe()
  }

  async onResetReport() {
    this.message.success('Your review result has been summited', { nzDuration: 3000, nzAnimate: true })
    this.router.navigate(['/vocabulary'])
    this.store.dispatch(fetchVocabularies())
  }

  getNextStep(reviewState: ReviewState) {
    const { state: vocabularies, step, consecutiveSetting, currentIndex } = reviewState
    if (step === EReviewStep.FIRST_PART) {
      const waitingVocabularies = vocabularies.filter(({ firstPartAnswers }) => {
        const lastWrongIndex = firstPartAnswers.lastIndexOf(false)
        return firstPartAnswers.length - lastWrongIndex <= consecutiveSetting.firstPart
      })
      if (waitingVocabularies.length === 0) return goToSecondPart()
      if (waitingVocabularies.length === 1) return goToNextVocabulary({
        nextIndex: vocabularies.indexOf(waitingVocabularies[0]),
      })
      const posibleNextVocabularies = waitingVocabularies.filter(v => v !== vocabularies[currentIndex])
      return goToNextVocabulary({
        nextIndex: vocabularies.indexOf(posibleNextVocabularies[random(posibleNextVocabularies.length - 1)]),
      })
    }
    if (step === EReviewStep.SECOND_PART) {
      const waitingVocabularies = vocabularies.filter(({ secondPartAnswers }) => {
        const lastWrongIndex = secondPartAnswers.lastIndexOf(false)
        return secondPartAnswers.length - lastWrongIndex <= consecutiveSetting.secondPart
      })
      if (waitingVocabularies.length === 0) return goToReport()
      if (waitingVocabularies.length === 1) return goToNextVocabulary({
        nextIndex: vocabularies.indexOf(waitingVocabularies[0]),
      })
      const posibleNextVocabularies = waitingVocabularies.filter(v => v !== vocabularies[currentIndex])
      return goToNextVocabulary({
        nextIndex: vocabularies.indexOf(posibleNextVocabularies[random(posibleNextVocabularies.length - 1)]),
      })
    }
  }
}
