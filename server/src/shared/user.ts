import { omit } from 'lodash'
import { createModel } from './create-model'
import { Tables, createToken, Settings } from '../global-refs'

export interface IUser {
  userId: number
  email: string
  passwordHash: string
  name: string
  modified: Date | string
  created: Date | string
}

export type UserWithToken = IUser & { token: string }

export class User extends createModel<IUser>(Tables.USER) {
  public static async getUserLoginOutput(user: IUser, isRememberMe?: boolean) {
    const expiresIn = isRememberMe ? Settings.SESSION_REMEMBER_ME_EXPIRED_TIME : Settings.SESSION_EXPIRED_TIME
    const token = await createToken({ userId: user.userId }, expiresIn)
    return {
      ...omit(user, 'passwordHash'),
      token,
    }
  }
}
