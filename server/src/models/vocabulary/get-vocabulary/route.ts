import { IApiRoute } from '../../../global-refs'
import { IGetVocabulariesInput } from './metadata'
import { GetVocabulariesService } from './service'

export const getVocabulariesRoute: IApiRoute<IGetVocabulariesInput> = {
  Service: GetVocabulariesService,
  path: '/vocabulary',
  mapper: req => {
    const { fromDate, toDate, lessonIds, pageSize, page } = req.query as IGetVocabulariesInput
    return { fromDate, toDate, lessonIds, page: Number(page), pageSize: Number(pageSize) }
  },
  method: 'GET',
}
