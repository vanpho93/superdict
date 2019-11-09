import { createReducer, on } from '@ngrx/store'
import { ReviewState, EReviewStep, IReviewingVocabulary } from './review.metadata'
import {
  startReviewing,
  fetchListReviewingVocabularySuccess,
  goToNextVocabulary,
  goToSecondPart,
  goToReport,
  skipVocabulary,
  sendSubmitReportRequest,
  sendSubmitReportSuccess,
  resetReport,
  sendAnswerSuccess,
  sendAnswer,
} from './review.action'

const initialState: ReviewState = {
  state: [],
  isLoading: false,
  currentIndex: null,
  consecutiveSetting: {
    firstPart: 0,
    secondPart: 0,
  },
  step: EReviewStep.WAITING,
  isAnswering: false,
  isSubmiting: false,
}

// tslint:disable-next-line: variable-name
const _reviewReducer = createReducer<ReviewState>(initialState,
  on(startReviewing, (state, { firstPart, secondPart }) => ({
    ...state,
    isLoading: true,
    step: EReviewStep.LOADING_VOCABULARY_LIST,
    consecutiveSetting: { firstPart, secondPart },
  })),
  on(fetchListReviewingVocabularySuccess, (state, { vocabularies }) => ({
    ...state,
    isLoading: false,
    step: EReviewStep.FIRST_PART,
    state: vocabularies.map(vocabulary => ({
      ...vocabulary,
      firstPartAnswers: [],
      secondPartAnswers: [],
    })),
  })),
  on(goToNextVocabulary, (state, { nextIndex }) => ({
    ...state,
    isLoading: true,
    currentIndex: nextIndex,
  })),
  on(sendAnswer, (state) => ({ ...state, isAnswering: true })),
  on(sendAnswerSuccess, (odlState, { isRight }) => {
    const { state: vocabularies, currentIndex, step } = odlState
    return {
      ...odlState,
      state: vocabularies.map((vocabulary, index) => {
        if (index !== currentIndex) return vocabulary
        if (step === EReviewStep.FIRST_PART) return { ...vocabulary, firstPartAnswers: [...vocabulary.firstPartAnswers, isRight] }
        return { ...vocabulary, secondPartAnswers: [...vocabulary.secondPartAnswers, isRight] }
      }),
      isAnswering: false,
    }
  }),
  on(goToSecondPart, (state) => {
    return {
      ...state,
      step: EReviewStep.SECOND_PART,
      currentIndex: null,
    }
  }),
  on(skipVocabulary, (odlState) => {
    const { state: vocabularies, currentIndex } = odlState
    return {
      ...odlState,
      state: vocabularies.filter((_, index) => index !== currentIndex)
    }
  }),
  on(goToReport, state => ({
    ...state,
    step: EReviewStep.REPORT,
  })),
  on(sendSubmitReportRequest, state => ({
    ...state,
    isSubmiting: true,
  })),
  on(sendSubmitReportSuccess, state => ({
    ...state,
    isSubmiting: false,
  })),
  on(resetReport, () => initialState),
)

export function reviewReducer(state: ReviewState, action) {
  return _reviewReducer(state, action)
}
