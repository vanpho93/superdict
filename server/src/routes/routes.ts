import { IApiRoute } from '../metadata'
// accounts
import { loginRoute } from '../models/user/login/route'
import { checkTokenRoute } from '../models/user/check-token/route'
// lesson
import { route as getGamesRoute } from '../models/game/get-pending-games/route'
import { route as getGameById } from '../models/game/get-game-by-id/route'
import { route as getTipster } from '../models/tipster/get-tipters/route'

// tslint:disable-next-line: no-any
export const routes: IApiRoute<any>[] = [
  // user routes
  loginRoute,
  checkTokenRoute,
  // games
  getGamesRoute,
  getGameById,
  // tipster
  getTipster,
]
