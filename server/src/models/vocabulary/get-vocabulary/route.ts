import { IApiRoute } from '../../../global-refs'
import { IGetVocabulariesInput } from './metadata'
import { GetVocabulariesService } from './service'

export const getVocabulariesRoute: IApiRoute<IGetVocabulariesInput> = {
  Service: GetVocabulariesService,
  path: '/vocabulary',
  mapper: req => {
    const { fromDate, toDate, lessonIds, limit } = req.query
    return { fromDate, toDate, lessonIds, limit }
  },
  method: 'GET',
}