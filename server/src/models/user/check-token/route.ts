import { IApiRoute } from '../../../global-refs'
import { CheckTokenService } from './service'

export const checkTokenRoute: IApiRoute<void> = {
  Service: CheckTokenService,
  path: '/user/check',
  method: 'GET',
}
