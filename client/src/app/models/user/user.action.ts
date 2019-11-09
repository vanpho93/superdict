import { createAction, props } from '@ngrx/store'
import { IUser, ESignInError } from './user.metadata'

export const signIn = createAction(
  '[User context] Send SignIn Request',
  props<{ email: string, password: string }>()
)

export const signInSuccess = createAction(
  '[User context] SignIn Success',
  props<{ user: IUser }>(),
)

export const signInFailure = createAction(
  '[User context] SignIn Failure',
  props<{ errorMessage: ESignInError }>()
)

export const sendSignOutRequest = createAction('[User context] Send Sign Out Request')

export const signOutSuccess = createAction('[User context] Sign Out Success')

export const checkToken = createAction('[User context] Send Check Token Request')

export const checkTokenSuccess = createAction(
  '[User context] Check Token Success',
  props<{ user: IUser }>(),
)

export const checkTokenFailure = createAction('[User context] Check Token Failure')
