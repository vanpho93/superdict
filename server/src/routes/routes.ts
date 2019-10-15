import { IApiRoute } from '../metadata'
// accounts
import { loginRoute } from '../models/user/login/route'
import { checkTokenRoute } from '../models/user/check-token/route'
import { getVocabulariesRoute } from '../models/vocabulary/get-vocabulary/route'
import { createVocabularysRoute } from '../models/vocabulary/create-vocabulary/route'

// tslint:disable-next-line: no-any
export const routes: IApiRoute<any>[] = [
  // user routes
  loginRoute,
  checkTokenRoute,
  // vocabulary
  getVocabulariesRoute,
  createVocabularysRoute,
]
