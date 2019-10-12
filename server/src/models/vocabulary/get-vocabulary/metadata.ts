export interface IGetVocabulariesInput {
  fromLesson: number
  toLesson: number
  fromDate: number
  toDate: number
  lessonIds?: number[]
}

export enum IGetVocabulariesError {
}
