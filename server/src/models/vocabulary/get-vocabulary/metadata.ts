import { IVocabulary } from '../../../global-refs'

export interface IGetVocabulariesInput {
  fromDate: number
  toDate: number
  lessonIds?: number[]
  pageSize: number
  page: number
}

export enum IGetVocabulariesError {
}

export type IVocabularyOutput = IVocabulary & { type: string }

export interface IGetVocabulariesOutput {
  vocabularies: IVocabularyOutput[]
  total: number
}
