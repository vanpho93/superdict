import { AsyncState } from '../metadata'

export interface ILesson {
  lessonId: number
  name: string
}

interface ILessonAdditionalState {
  createLesson: {
    isLoading: boolean
    visible: boolean
  }
}

export type LessonState = AsyncState<ILesson[], ILessonAdditionalState>
