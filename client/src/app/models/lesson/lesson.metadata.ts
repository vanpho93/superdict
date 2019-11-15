import { AsyncState } from '../metadata'

export class ILesson {
  lessonId: number
  name: string
}

export type LessonState = AsyncState<ILesson[]>
