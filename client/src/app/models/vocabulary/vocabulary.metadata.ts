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

export type LessonFilter = 'every' | 'unknown' | number

interface IVocabularyAdditionalState {
  filter: {
    fromDate: Date
    toDate: Date
    lesson: LessonFilter
  }
  paging: {
    currentPage: number
    total: number
    pageSize: number
  }
  isCollapsed: boolean
  selectedVocabularyIds: number[]
  assignLesson: {
    visible: boolean
    isLoading: boolean
  }
}

export type VocabularyState = AsyncState<IVocabulary[], IVocabularyAdditionalState>
