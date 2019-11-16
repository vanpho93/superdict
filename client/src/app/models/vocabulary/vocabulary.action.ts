import { createAction, props } from '@ngrx/store'
import { IVocabulary, LessonFilter } from './vocabulary.metadata'

export const fetchVocabularies = createAction(
  '[Vocabulary Screen] Send fetch vocabularies request',
)

export const fetchVocabulariesSuccess = createAction(
  '[Vocabulary Screen] Fetch vocabularies success',
  props<{ vocabularies: IVocabulary[], total: number }>(),
)

export const changeVocabularyPageSize = createAction(
  '[Vocabulary Screen] Change vocabulary page size',
  props<{ pageSize: number }>(),
)

export const changeVocabularyDateRange = createAction(
  '[Vocabulary Screen] Change vocabulary date range',
  props<{ fromDate: Date, toDate: Date }>(),
)

export const changeVocabularyCurrentPage = createAction(
  '[Vocabulary Screen] Change vocabulary current page',
  props<{ currentPage: number }>(),
)

export const changeVocabularyLessonFilter = createAction(
  '[Vocabulary Screen] Change vocabulary lesson',
  props<{ lesson: LessonFilter }>(),
)

export const toggleCollapsedVocabularyList = createAction(
  '[Vocabulary Screen] toggle collapsed vocabulary list',
  props<{ isCollapsed: boolean }>(),
)

export const toggleSelectVocabulary = createAction(
  '[Vocabulary Screen] toggle select vocabulary',
  props<{ vocabularyId: number }>(),
)

export const sendAssginLessonRequest = createAction(
  '[Vocabulary Screen] send assign lesson request',
  props<{ lessonId: number }>(),
)

export const assginLessonSuccess = createAction(
  '[Vocabulary Screen] assign lesson success',
  props<{ lessonId: number }>(),
)

export const clearSelectedVocabularies = createAction('[Vocabulary Screen] clear selected vocabularies')

export const markAllShowingVocabulariesAsSelected = createAction('[Vocabulary Screen] mark all vocabularies as selected')
