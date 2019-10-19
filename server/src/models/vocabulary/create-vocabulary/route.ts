import { IApiRoute } from '../../../global-refs'
import { ICreateVocabularyInput } from './metadata'
import { CreateVocabularyService } from './service'

export const createVocabularysRoute: IApiRoute<ICreateVocabularyInput> = {
  Service: CreateVocabularyService,
  path: '/vocabulary',
  mapper: req => {
    const { word, pronunciation, americanSound, britishSound, meaning, examples, wordType } = req.body as ICreateVocabularyInput
    return { word, pronunciation, americanSound, britishSound, meaning, examples, wordType }
  },
  method: 'POST',
}
