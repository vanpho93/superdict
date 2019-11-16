import { IApiRoute } from '../../../global-refs'
import { CreateLessonService } from './service'
import { ICreateLessonInput } from './metadata'

export const createLessonRoute: IApiRoute<ICreateLessonInput> = {
  Service: CreateLessonService,
  path: '/lesson',
  mapper: req => ({ name: req.body.name }),
  method: 'POST',
}
