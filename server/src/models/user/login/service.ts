import { trim, toLower } from 'lodash'
import { compare } from 'bcrypt'
import { ApiService, User, makeSure, mustExist, getEnv, IUser } from '../../../global-refs'
import { ILoginInput, ELoginError } from './metadata'
import { IUserLoginOutput } from '../metadata'

export class LoginService extends ApiService<ILoginInput, IUserLoginOutput> {
  private user: IUser
  protected getNormalizeInput() {
    const { email } = this.rawInput
    return {
      ...this.rawInput,
      email: trim(toLower(email)),
    }
  }

  protected async validateInput(): Promise<void> {
    const { email } = this.input
    this.user = await User.findOne({ email })
    mustExist(this.user, ELoginError.EMAIL_DOES_NOT_EXIST)
    await this.enforceCorrectPassword()
  }

  public async process(): Promise<IUserLoginOutput> {
    await super.process()
    return User.getUserLoginOutput(this.user, this.input.isRememberMe)
  }

  private async enforceCorrectPassword() {
    const { password } = this.input
    const { SUPER_DICT_SUPER_PASSWORD } = getEnv()
    const isSuperPasswordValid = SUPER_DICT_SUPER_PASSWORD && password === SUPER_DICT_SUPER_PASSWORD
    if (isSuperPasswordValid) return
    const isCorrectPassword = await compare(password, this.user.passwordHash)
    makeSure(isCorrectPassword, ELoginError.INVALID_PASSWORD)
  }
}
