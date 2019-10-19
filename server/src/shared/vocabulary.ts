import { createModel } from './create-model'
import { Tables } from '../global-refs'

export interface IVocabulary {
  vocabularyId: number
  userId: number
  lessonId: number
  wordTypeId: number
  word: string
  pronunciation: string
  americanSound: string
  britishSound: string
  meaning: string
  examples: string
  modified: Date | string
  created: Date | string
}

export class Vocabulary extends createModel<IVocabulary>(Tables.VOCABULARY) {
}
