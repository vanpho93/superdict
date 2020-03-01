import { flatten } from 'lodash'
import { IApiRoute } from '../../../global-refs'
import { IInput } from './metadata'
import { Service } from './service'

export const route: IApiRoute<IInput> = {
  Service,
  path: '/tipster',
  method: 'GET',
  mapper: req => ({ names: flatten([req.query.names]) }),
  isPrivateRoute: false,
}
