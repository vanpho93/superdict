export interface IGetVocabulariesInput {
  fromDate: number
  toDate: number
  lessonIds?: number[]
  limit: number
}

export enum IGetVocabulariesError {
}
