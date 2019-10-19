import { createModel } from './create-model'
import { Tables } from '../global-refs'

export interface ILesson {
  lessonId: number
  userId: number
  name: string
  modified: Date | string
  created: Date | string
}

export class Lesson extends createModel<ILesson>(Tables.LESSON) {
}
