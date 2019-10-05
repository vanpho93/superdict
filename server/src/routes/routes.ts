import { IApiRoute } from '../metadata'
// accounts
import { loginRoute } from '../models/user/login/route'
import { checkTokenRoute } from '../models/user/check-token/route'

// tslint:disable-next-line: no-any
export const routes: IApiRoute<any>[] = [
  // user routes
  loginRoute,
  checkTokenRoute,
]
