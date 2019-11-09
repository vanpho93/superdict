import { AsyncState } from '../metadata'

export interface IUser {
  email: string
  firstName: string
  lastName: string
  token: string
}

export enum ESignInError {
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

export type UserState = AsyncState<IUser, { isCheckTokenDone?: boolean }>
