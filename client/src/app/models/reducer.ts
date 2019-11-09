import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../../environments/environment'
import { userReducer, UserState } from './user'
import { VocabularyState, vocabularyReducer } from './vocabulary'
import { ReviewState, reviewReducer } from './review'

export interface State {
  user: UserState
  vocabulary: VocabularyState
  review: ReviewState
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  vocabulary: vocabularyReducer,
  review: reviewReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
