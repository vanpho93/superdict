import { AsyncState } from '../metadata'
import { IVocabulary } from '..'

export enum EReviewStep {
  WAITING = 'WAITING',
  LOADING_VOCABULARY_LIST = 'LOADING_VOCABULARY_LIST',
  FIRST_PART = 'FIRST_PART',
  SECOND_PART = 'SECOND_PART',
  REPORT = 'REPORT',
  SUMITING_REPORT = 'SUMITING_REPORT',
  DONE = 'DONE'
}

export interface IReviewingVocabulary extends IVocabulary {
  firstPartAnswers: boolean []
  secondPartAnswers: boolean []
}

export interface IReviewAdditionalState {
  currentIndex: number
  consecutiveSetting: {
    firstPart: number
    secondPart: number
  }
  step: EReviewStep
  isAnswering: boolean
  isSubmiting: boolean
}

export type ReviewState = AsyncState<IReviewingVocabulary[], IReviewAdditionalState>
