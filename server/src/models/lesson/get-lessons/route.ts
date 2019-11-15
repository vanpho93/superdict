import { IApiRoute } from '../../../global-refs'
import { GetLessonsService } from './service'

export const getLessonsRoute: IApiRoute<void> = {
  Service: GetLessonsService,
  path: '/lesson',
  method: 'GET',
}
