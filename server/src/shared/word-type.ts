import { createModel } from './create-model'
import { Tables } from '../global-refs'

export interface IWordType {
  wordTypeId: number
  name: string
  modified: Date | string
  created: Date | string
}

export class WordType extends createModel<IWordType>(Tables.WORD_TYPE) {
}
