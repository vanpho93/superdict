import { createReducer, on } from '@ngrx/store'
import { LessonState } from './lesson.metadata'
import {
  fetchLessons,
  fetchLessonsSuccess,
  showModalCreateLesson,
  hideModalCreateLesson,
  sendAssginLessonRequest,
  createLessonSuccess,
} from './lesson.action'

const initialState: LessonState = {
  isLoading: false,
  state: [],
  createLesson: {
    visible: false,
    isLoading: false,
  }
}

// tslint:disable-next-line: variable-name
const _lessonReducer = createReducer<LessonState>(initialState,
  on(fetchLessons, state => ({ ...state, isLoading: true })),
  on(fetchLessonsSuccess, (state, { lessons }) => ({ ...state, isLoading: false, state: lessons })),
  on(showModalCreateLesson, state => ({ ...state, createLesson: { ...state.createLesson, visible: true } })),
  on(hideModalCreateLesson, state => ({ ...state, createLesson: { ...state.createLesson, visible: false } })),
  on(sendAssginLessonRequest, state => ({ ...state, createLesson: { ...state.createLesson, isLoading: true } })),
  on(createLessonSuccess, state => ({ ...state, createLesson: { ...state.createLesson, isLoading: false, visible: false } }))
)

export function lessonReducer(state: LessonState, action) {
  return _lessonReducer(state, action)
}
