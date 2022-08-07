import { IApiRoute } from '../../../global-refs'
import { IGetVocabulariesInput } from './metadata'
import { GetVocabulariesService } from './service'

export const getVocabulariesRoute: IApiRoute<IGetVocabulariesInput> = {
  Service: GetVocabulariesService,
  path: '/vocabulary',
  mapper: req => {
    const { fromDate, toDate, lessonIds, pageSize, page, vocabularyIds, isFindUnknownLesson } = req.query as any as IGetVocabulariesInput
    return { fromDate, toDate, lessonIds, page: Number(page), pageSize: Number(pageSize), vocabularyIds, isFindUnknownLesson }
  },
  method: 'GET',
}
