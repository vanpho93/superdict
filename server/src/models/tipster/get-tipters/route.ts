import { flatten, defaultTo } from 'lodash'
import { IApiRoute } from '../../../global-refs'
import { IInput } from './metadata'
import { Service } from './service'

export const route: IApiRoute<IInput> = {
  Service,
  path: '/tipster',
  method: 'GET',
  mapper: req => ({ names: flatten([defaultTo(req.query.names, '')]) }),
  isPrivateRoute: false,
}
