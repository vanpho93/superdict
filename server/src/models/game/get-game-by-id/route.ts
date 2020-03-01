import { IApiRoute } from '../../../global-refs'
import { IInput } from './metadata'
import { Service } from './service'

export const route: IApiRoute<IInput> = {
  Service,
  path: '/game/:gameId',
  method: 'GET',
  mapper: req => ({ gameId: Number(req.params.gameId) }),
  isPrivateRoute: false,
}
