import { ApiService, User, makeSure } from '../../../global-refs'
import { IUserLoginOutput } from '../metadata'

export class CheckTokenService extends ApiService<void, IUserLoginOutput> {
  public async process(): Promise<IUserLoginOutput> {
    await super.process()
    return User.getUserLoginOutput(this.userContext.user)
  }

  protected async validateInput() {
    makeSure(this.userContext.isUser, 'INVALID_TOKEN', 401)
  }
}
