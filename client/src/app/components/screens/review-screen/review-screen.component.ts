import { shuffle, isNil, defaultTo } from 'lodash'
import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  State, startReviewing, ReviewState, IReviewingVocabulary,
  sendAnswer, skipVocabulary, sendSubmitReportRequest, resetReport, reviewReducer,
} from '../../../models'
import { map, withLatestFrom } from 'rxjs/operators'
import { NzMarks } from 'ng-zorro-antd'

interface IConsecutiveRightAnswer {
  firstPart: number
  secondPart: number
}

@Component({
  selector: 'app-review-screen',
  templateUrl: './review-screen.component.html',
  styleUrls: ['./review-screen.component.sass']
})

export class ReviewScreenComponent implements OnInit {
  consecutiveRightAnswer: IConsecutiveRightAnswer
  reviewState$: Observable<ReviewState>
  currentVocabulary$: Observable<IReviewingVocabulary>
  progress$: Observable<number>
  // part 0
  marks: NzMarks = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  }

  examples$: Observable<string[]>
  // part 1
  shouldShowExamples = true
  wordAnswer = ''
  // part 2
  currentPieces: string[] = []
  remainPieces: string[] = []

  constructor(private store: Store<State>) {
    this.consecutiveRightAnswer =  {
      firstPart: 1,
      secondPart: 0,
    }
    this.reviewState$ = this.store.select('review')
    this.currentVocabulary$ = this.store.pipe(
      select('review'),
      map(({ state: vocabularies, currentIndex }) => vocabularies[currentIndex])
    )
    this.progress$ = this.reviewState$.pipe(map(reviewState => {
      if (isNil(reviewState)) return 0
      const { consecutiveSetting, state: vocabularies } = reviewState
      const totalPoint = (consecutiveSetting.firstPart + consecutiveSetting.secondPart) * vocabularies.length
      const currentPoints = vocabularies.map(({ firstPartAnswers, secondPartAnswers }) => {
        const lastWrongAnswerIndexFirstPart = firstPartAnswers.lastIndexOf(false)
        const lastWrongAnswerIndexSecondPart = firstPartAnswers.lastIndexOf(false)
        return firstPartAnswers.length - lastWrongAnswerIndexFirstPart + secondPartAnswers.length - lastWrongAnswerIndexSecondPart - 2
      })
      const currentPoint = currentPoints.reduce((a, b) => a + b)
      return Math.floor(currentPoint / totalPoint * 100)
    }))

    this.examples$ = this.currentVocabulary$.pipe(
      map(vocabulary => {
        if (isNil(vocabulary)) return []
        const { examples: examplesInString, word } = vocabulary
        function replaceWordInExampleByDashes(example: string) {
          let result = example
          while (result.includes(word)) result = result.replace(word, '______')
          return result
        }
        const examples = defaultTo(examplesInString, '').split('|').map(replaceWordInExampleByDashes)
        return examples
      })
    )

    this.reviewState$.pipe(select('currentIndex'), withLatestFrom(this.currentVocabulary$))
      .subscribe(([_, vocabulary]) => {
        if (isNil(vocabulary)) return
        this.currentPieces = []
        this.remainPieces = this.getInitialRemainPieces(vocabulary.meaning)
      })
  }

  ngOnInit() {
  }

  startReviewing() {
    this.store.dispatch(startReviewing(this.consecutiveRightAnswer))
  }

  moveUp(remainPieceIndex: number) {
    const [word] = this.remainPieces.splice(remainPieceIndex, 1)
    this.currentPieces.push(word)
  }

  moveDown(currentPieceIndex: number) {
    const [word] = this.currentPieces.splice(currentPieceIndex, 1)
    this.remainPieces.push(word)
  }

  answerFirstPart() {
    this.store.dispatch(sendAnswer({ answer: this.wordAnswer }))
    this.wordAnswer = ''
  }

  answerSecondPart() {
    this.store.dispatch(sendAnswer({ answer: this.currentPieces.join(' ') }))
  }

  private getInitialRemainPieces(meaning: string) {
    const NUMBER_OF_PORTION = 3
    const SPACE = ' '
    const words = meaning.split(SPACE)
    const { length } = words

    if (length <= NUMBER_OF_PORTION) return shuffle(words)

    const minimumWordsInOnePiece = Math.floor(length / NUMBER_OF_PORTION)
    const div = length % NUMBER_OF_PORTION
    let lengthOfPieces = []

    lengthOfPieces.push(...(new Array(NUMBER_OF_PORTION - div).fill(minimumWordsInOnePiece)))
    lengthOfPieces.push(...(new Array(div).fill(minimumWordsInOnePiece + 1)))
    lengthOfPieces = shuffle(lengthOfPieces)

    const result: string[] = []
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < lengthOfPieces.length; index++) {
      const pieceLength = lengthOfPieces[index]
      result.push(words.splice(0, pieceLength).join(' '))
    }
    return shuffle(result)
  }

  skip() {
    this.store.dispatch(skipVocabulary())
  }

  submit() {
    this.store.dispatch(sendSubmitReportRequest())
  }

  reset() {
    this.store.dispatch(resetReport())
  }
}
