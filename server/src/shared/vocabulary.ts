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
  lastReviewed: Date
  intervalTime: number
  difficulty: number
  percentOverdue: number
  modified: Date
  created: Date
}

export class Vocabulary extends createModel<IVocabulary>(Tables.VOCABULARY) {
}
