import { AsyncState } from '../metadata'

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
  created: string
  lastReviewed: string
  dueDate: string
  intervalTime: number
  difficulty: number
  percentOverdue: number
  modified: string
  type: string
}

interface IVocabularyAdditionalState {
  filter: {
    fromDate: Date
    toDate: Date
  }
  paging: {
    currentPage: number
    total: number
    pageSize: number
  }
  isCollapsed: boolean
  selectedVocabularyIds: number[]
}

export type VocabularyState = AsyncState<IVocabulary[], IVocabularyAdditionalState>
