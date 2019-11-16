export interface IAssignLessonInput {
  lessonId: number
  vocabularyIds: number[]
}

export enum EAssignLessonError {
  CANNOT_FIND_LESSON = 'CANNOT_FIND_LESSON',
}
