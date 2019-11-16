import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../../environments/environment'
import { userReducer, UserState } from './user'
import { VocabularyState, vocabularyReducer } from './vocabulary'
import { ReviewState, reviewReducer } from './review'
import { LessonState, lessonReducer } from './lesson'

export interface State {
  user: UserState
  vocabulary: VocabularyState
  review: ReviewState
  lesson: LessonState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  vocabulary: vocabularyReducer,
  review: reviewReducer,
  lesson: lessonReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
