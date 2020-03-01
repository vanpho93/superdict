import { IApiRoute } from '../../../global-refs'
import { IInput } from './metadata'
import { Service } from './service'

export const route: IApiRoute<IInput> = {
  Service,
  path: '/pending-game',
  method: 'GET',
  isPrivateRoute: false,
}
