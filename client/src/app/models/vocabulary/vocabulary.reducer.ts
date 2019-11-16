import { map } from 'lodash'
import { createReducer, on } from '@ngrx/store'
import { VocabularyState } from './vocabulary.metadata'
import {
  fetchVocabularies,
  fetchVocabulariesSuccess,
  changeVocabularyPageSize,
  changeVocabularyDateRange,
  changeVocabularyCurrentPage,
  toggleCollapsedVocabularyList,
  toggleSelectVocabulary,
  clearSelectedVocabularies,
  markAllShowingVocabulariesAsSelected,
  changeVocabularyLessonFilter,
  showAssginLessonModal,
  assginLessonSuccess,
  sendAssginLessonRequest,
  hideAssginLessonModal,
} from './vocabulary.action'

const SEVEN_DAYS = 7 * 86400000

const initialState: VocabularyState = {
  isLoading: false,
  filter: {
    fromDate: new Date(Date.now() - SEVEN_DAYS),
    toDate: new Date(),
    lesson: 'every',
  },
  paging: {
    currentPage: 2,
    total: 11,
    pageSize: 20,
  },
  isCollapsed: false,
  state: [],
  selectedVocabularyIds: [],
  assignLesson: {
    isLoading: false,
    visible: false,
  }
}

// tslint:disable-next-line: variable-name
const _vocabularyReducer = createReducer<VocabularyState>(initialState,
  on(fetchVocabularies, state => ({ ...state, isLoading: true, state: [] })),
  on(fetchVocabulariesSuccess, (state, { vocabularies, total }) => ({
    ...state,
    isLoading: false,
    state: vocabularies,
    paging: {
      ...state.paging,
      total,
    }
  })),
  on(changeVocabularyPageSize, (state, { pageSize }) => ({
    ...state,
    paging: {
      ...state.paging,
      pageSize,
      currentPage: 1,
    }
  })),
  on(changeVocabularyDateRange, (state, { fromDate, toDate }) => ({
    ...state,
    paging: {
      ...state.paging,
      currentPage: 1,
    },
    filter: {
      ...state.filter,
      fromDate,
      toDate,
    }
  })),
  on(changeVocabularyCurrentPage, (state, { currentPage }) => ({
    ...state,
    paging: {
      ...state.paging,
      currentPage,
    }
  })),
  on(toggleCollapsedVocabularyList, (state, { isCollapsed }) => ({
    ...state,
    isCollapsed,
  })),
  on(toggleSelectVocabulary, (state, { vocabularyId }) => {
    const isBelongingToTheList = state.selectedVocabularyIds.includes(vocabularyId)
    const newSelectedVocabularyIds = isBelongingToTheList ?
    state.selectedVocabularyIds.filter(id => id !== vocabularyId) :
    state.selectedVocabularyIds.concat(vocabularyId)
    return {
      ...state,
      selectedVocabularyIds: newSelectedVocabularyIds,
    }
  }),
  on(clearSelectedVocabularies, state => ({ ...state, selectedVocabularyIds: [] })),
  on(markAllShowingVocabulariesAsSelected, oldState => {
    const unselectedVocabularies = oldState.state.filter(vocabulary => !oldState.selectedVocabularyIds.includes(vocabulary.vocabularyId))
    return ({ ...oldState, selectedVocabularyIds: oldState.selectedVocabularyIds.concat(...map(unselectedVocabularies, 'vocabularyId')) })
  }),
  on(changeVocabularyLessonFilter, (state, { lesson }) => ({
    ...state,
    filter: {
      ...state.filter,
      lesson,
    },
    paging: {
      ...state.paging,
      currentPage: 1,
    }
  })),
  on(sendAssginLessonRequest, state => ({ ...state, assignLesson: { ...state.assignLesson, isLoading: true } })),
  on(showAssginLessonModal, state => ({ ...state, assignLesson: { visible: true, isLoading: false } })),
  on(assginLessonSuccess, state => ({ ...state, assignLesson: { visible: false, isLoading: false } })),
  on(hideAssginLessonModal, state => ({ ...state, assignLesson: { visible: false, isLoading: false } }))
)

export function vocabularyReducer(state: VocabularyState, action) {
  return _vocabularyReducer(state, action)
}
