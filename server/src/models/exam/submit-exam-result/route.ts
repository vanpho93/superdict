import { IApiRoute } from '../../../global-refs'
import { ISubmitExamResultInput } from './metadata'
import { SubmitExamResultService } from './service'

export const submitExamResultRoute: IApiRoute<ISubmitExamResultInput> = {
  Service: SubmitExamResultService,
  path: '/exam-result',
  mapper: req => {
    return req.body.result as ISubmitExamResultInput
  },
  method: 'POST',
}
