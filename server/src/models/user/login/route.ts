import { pick } from 'lodash'
import { IApiRoute } from '../../../global-refs'
import { ILoginInput } from './metadata'
import { LoginService } from './service'

export const loginRoute: IApiRoute<ILoginInput> = {
  Service: LoginService,
  path: '/user/login',
  mapper: req => {
    const props: Array<keyof ILoginInput> = ['email', 'password', 'isRememberMe']
    return pick(req.body as ILoginInput, props)
  },
  method: 'POST',
}
