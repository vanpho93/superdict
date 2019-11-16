import { createAction, props } from '@ngrx/store'
import { ILesson } from '.'

export const fetchLessons = createAction(
  '[Lesson] Send fetch lessons request',
)

export const fetchLessonsSuccess = createAction(
  '[Lesson] Fetch lessons request success',
  props<{ lessons: ILesson[] }>(),
)

export const showModalCreateLesson = createAction('[Lesson] Show modal create lesson')

export const hideModalCreateLesson = createAction('[Lesson] Hide modal create lesson')

export const sendCreateLessonRequest = createAction(
  '[Lesson] send create lesson request',
  props<{ name: string }>(),
)

export const createLessonSuccess = createAction('[Lesson] create lesson success')
