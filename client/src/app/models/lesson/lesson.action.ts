import { createAction, props } from '@ngrx/store'
import { ILesson } from '.'

export const fetchLessons = createAction(
  '[Lesson] Send fetch lessons request',
)

export const fetchLessonsSuccess = createAction(
  '[Lesson] Fetch lessons request success',
  props<{ lessons: ILesson[] }>(),
)
