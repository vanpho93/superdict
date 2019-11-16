import { IApiRoute } from '../../../global-refs'
import { IAssignLessonInput } from './metadata'
import { AssignLessonService } from './service'

export const assignLessonRoute: IApiRoute<IAssignLessonInput> = {
  Service: AssignLessonService,
  path: '/vocabulary/assign-lesson',
  mapper: req => {
    const { lessonId, vocabularyIds } = req.body as IAssignLessonInput
    return { lessonId, vocabularyIds }
  },
  method: 'PUT',
}
