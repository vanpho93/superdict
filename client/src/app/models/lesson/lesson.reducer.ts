import { createReducer, on } from '@ngrx/store'
import { LessonState } from './lesson.metadata'
import { fetchLessons, fetchLessonsSuccess } from './lesson.action'

const initialState: LessonState = {
  isLoading: false,
  state: [],
}

// tslint:disable-next-line: variable-name
const _lessonReducer = createReducer<LessonState>(initialState,
  on(fetchLessons, state => ({ ...state, isLoading: true })),
  on(fetchLessonsSuccess, (state, { lessons }) => ({ ...state, isLoading: false, state: lessons }))
)

export function lessonReducer(state: LessonState, action) {
  return _lessonReducer(state, action)
}
