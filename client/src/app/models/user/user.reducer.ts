import { createReducer, on } from '@ngrx/store'
import { UserState } from './user.metadata'
import {
  signIn, signInSuccess, signInFailure, sendSignOutRequest,
  signOutSuccess, checkToken, checkTokenSuccess, checkTokenFailure,
} from './user.action'


const initialState: UserState = {
  state: null,
  isLoading: false,
  isCheckTokenDone: false,
}

// tslint:disable-next-line: variable-name
const _userReducer = createReducer<UserState>(initialState,
  on(signIn, state => ({ ...state, state: null, isLoading: true })),
  on(signInSuccess, (state, { user }) => ({ ...state, state: user, isLoading: false })),
  on(signInFailure, (state, { errorMessage }) => ({ ...state, isLoading: false, state: null, errorMessage })),
  on(checkToken, state => ({ ...state, state: null, isLoading: true })),
  on(checkTokenSuccess, (state, { user }) => ({ ...state, state: user, isLoading: false, isCheckTokenDone: true })),
  on(checkTokenFailure, state => ({ ...state, isLoading: false, state: null, isCheckTokenDone: true })),
  on(sendSignOutRequest, state => ({ ...state, isLoading: true, })),
  on(signOutSuccess, state => ({ ...state, isLoading: false, state: null })),
)

export function userReducer(state: UserState, action) {
  return _userReducer(state, action)
}
