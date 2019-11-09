import { createAction, props } from '@ngrx/store'
import { IVocabulary } from '..'

export const startReviewing = createAction(
  '[Review context] Start reviewing',
  props<{ firstPart: number, secondPart: number }>()
)

export const fetchListReviewingVocabularySuccess = createAction(
  '[Review context] Fetch list reviewing vocabulary success',
  props<{ vocabularies: IVocabulary[] }>()
)

export const sendAnswer = createAction(
  '[Review context] send answer',
  props<{ answer: string }>()
)

export const sendAnswerSuccess = createAction(
  '[Review context] send answer success',
  props<{ isRight: boolean }>()
)

export const goToNextVocabulary = createAction(
  '[Review context] go to next vocabulary',
  props<{ nextIndex: number }>()
)

export const goToSecondPart = createAction('[Review context] go to second part')

export const answerSecondPart = createAction(
  '[Review context] answer second part',
  props<{ meaning: string }>()
)

export const goToReport = createAction('[Review context] go to report')

export const skipVocabulary = createAction('[Review context] skip vocabulary')

export const sendSubmitReportRequest = createAction('[Review context] submit report')

export const sendSubmitReportSuccess = createAction('[Review context] submit report success')

export const resetReport = createAction('[Review context] reset report')
