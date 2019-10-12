import { IApiRoute } from '../../../global-refs'
import { IGetVocabulariesInput } from './metadata'
import { GetVocabulariesService } from './service'

export const getVocabulariesRoute: IApiRoute<IGetVocabulariesInput> = {
  Service: GetVocabulariesService,
  path: '/vocabulary',
  mapper: req => {
    const { fromLesson, toLesson, fromDate, toDate, lessonIds } = req.query
    return { fromLesson, toLesson, fromDate, toDate, lessonIds }
  },
  method: 'GET',
}
