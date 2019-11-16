import { isNumber } from 'lodash'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { Observable } from 'rxjs'
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators'
import { FetchService } from '../../services'
import {
  fetchVocabulariesSuccess,
  fetchVocabularies,
  changeVocabularyCurrentPage,
  changeVocabularyDateRange,
  changeVocabularyPageSize,
  changeVocabularyLessonFilter,
  sendAssginLessonRequest,
  assginLessonSuccess,
} from './vocabulary.action'
import { IVocabulary, LessonFilter } from './vocabulary.metadata'
import { Store, select } from '@ngrx/store'
import { State } from '..'

interface IVocabularyQuery {
  fromDate?: Date
  toDate?: Date
  currentPage?: number
  pageSize?: number
  vocabularyIds?: number[]
  lesson: LessonFilter
  isFindUnknownLesson?: boolean
}

@Injectable()
export class VocabularyEffects {
  vocabularyState$ = this.store.select('vocabulary')

  fetch$ = createEffect(() => {
    const filterByActionType = ofType(fetchVocabularies)
    const fetchVocabulary$ = this.actions$.pipe(filterByActionType, map(() => 1))

    return fetchVocabulary$.pipe(
      withLatestFrom(this.vocabularyState$),
      mergeMap(([_, { filter, paging }]) => this.fetchVocabularies({
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          pageSize: paging.pageSize,
          currentPage: paging.currentPage,
          lesson: filter.lesson,
        })
        .pipe(
          map(({ vocabularies, total }) => (fetchVocabulariesSuccess({ vocabularies, total }))),
          catchError(() => EMPTY)
        )
      ),
    )
  })

  reFetch$ = createEffect(() => {
    const filterByActionTypes = ofType(
      changeVocabularyCurrentPage,
      changeVocabularyDateRange,
      changeVocabularyPageSize,
      changeVocabularyLessonFilter,
    )
    return this.actions$.pipe(filterByActionTypes, map(() => ({ type: '[Vocabulary Screen] Send fetch vocabularies request' })))
  })

  assignLesson$ = createEffect(() => {
    const sendAssignLesson$ = this.actions$.pipe(ofType(sendAssginLessonRequest))
    const selectedVocabularyIds$ = this.vocabularyState$.pipe(select('selectedVocabularyIds')) as Observable<number[]>
    return sendAssignLesson$.pipe(
      withLatestFrom(selectedVocabularyIds$),
      mergeMap(([{ lessonId }, vocabularyIds]) => this.assignLesson(lessonId, vocabularyIds)),
      map(lessonId => assginLessonSuccess({ lessonId }))
    )
  })

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private fetch: FetchService
  ) {}

  fetchVocabularies(vocabularyQuery: IVocabularyQuery): Observable<{ vocabularies: IVocabulary[], total: number }> {
    const { fromDate, toDate, pageSize, currentPage, vocabularyIds, lesson } = vocabularyQuery

    const isLessonDefined = isNumber(lesson)
    const lessonIds = isLessonDefined ? [lesson] : []

    return this.fetch.get('/vocabulary', {
      fromDate: isLessonDefined ? null : new Date(fromDate).getTime(),
      toDate: isLessonDefined ? null : new Date(toDate).getTime(),
      pageSize,
      page: currentPage,
      vocabularyIds,
      lessonIds,
      isFindUnknownLesson: lesson === 'unknown',
    })
  }

  assignLesson(lessonId: number, vocabularyIds: number[]) {
    return this.fetch.put('/vocabulary/assign-lesson', {
      lessonId,
      vocabularyIds,
    }).pipe(map(() => lessonId))
  }
}
