import { isNil } from 'lodash'
import { Request } from 'express'
import { IUser, exist, Redis, User, verifyToken, EEnviroment, getEnv } from '../global-refs'

export interface IUserContext {
  readonly isUser: boolean
  readonly userId?: number
  readonly user?: IUser
  readonly token?: string
}

export class UserContext implements IUserContext {
  static async getUserContext(req: Request) {
    const { token } = req.headers as { [key: string]: string }
    if (isNil(token)) return new UserContext()

    const isSuperToken = token.includes(':')
    const user = isSuperToken ?
      await this.getUserContextForSuperToken(token) :
      await this.getUserContextForNormalToken(token)

    if (isNil(user)) return new UserContext()
    return new UserContext(user, token)
  }

  private static async getUserContextForNormalToken(token: string): Promise<IUser> {
    try {
      const { userId } = await verifyToken(token)
      if (isNil(userId)) return

      const isLoggedOut = await Redis.isTokenInBlackList(token)
      if (isLoggedOut) return

      return User.findById(userId)
    } catch (error) {
      return
    }
  }

  private static async getUserContextForSuperToken(token: string): Promise<IUser> {
    const { NODE_ENV, SUPER_DICT_SUPER_PASSWORD } = getEnv()
    if (NODE_ENV === EEnviroment.PRODUCTION) return
    const [tokenPrefix, superPassword, email] = token.split(':')
    console.log({ tokenPrefix, superPassword, email })
    if (tokenPrefix !== 'SUPER_TOKEN' || superPassword !== SUPER_DICT_SUPER_PASSWORD) return
    if (isNil(email)) return
    return User.findOne({ email })
  }

  constructor(
    readonly user: IUser = null,
    readonly token: string = null
  ) { }

  get isUser() { return exist(this.user) }

  get userId() { return this.user.userId }
}
