import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { en_GB, NzI18nService } from 'ng-zorro-antd/i18n'
import {
  VocabularyState,
  LessonState,
  State,
  fetchVocabularies,
  changeVocabularyPageSize,
  changeVocabularyCurrentPage,
  changeVocabularyDateRange,
  toggleCollapsedVocabularyList,
  toggleSelectVocabulary,
  clearSelectedVocabularies,
  markAllShowingVocabulariesAsSelected,
  fetchLessons,
  LessonFilter,
  changeVocabularyLessonFilter,
  sendAssginLessonRequest,
  showAssginLessonModal,
  hideAssginLessonModal,
} from '../../../models'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-vocabulary-screen',
  templateUrl: './vocabulary-screen.component.html',
  styleUrls: ['./vocabulary-screen.component.sass']
})

export class VocabularyScreenComponent implements OnInit {
  vocabularyState$: Observable<VocabularyState>
  lessonState$: Observable<LessonState>
  dateRange$: Observable<Date[]>
  popoverActionVisible = false
  lessonToAssign: number
  assignLessonModelVisible$: Observable<boolean>
  assignLessonModelIsLoading$: Observable<boolean>

  constructor(private store: Store<State>, private i18n: NzI18nService) {
    this.vocabularyState$ = this.store.pipe(select('vocabulary'))
    this.assignLessonModelVisible$ = this.store.pipe(select('vocabulary'), select('assignLesson'), select('visible'))
    this.assignLessonModelIsLoading$ = this.store.pipe(select('vocabulary'), select('assignLesson'), select('isLoading'))
    this.lessonState$ = this.store.pipe(select('lesson'))
    this.dateRange$ = this.vocabularyState$.pipe(map(({ filter: { fromDate, toDate } }) => [fromDate, toDate]))
    this.i18n.setLocale(en_GB)
  }

  ngOnInit() {
    if (environment.defaultState) return
    this.store.dispatch(fetchVocabularies())
    this.store.dispatch(fetchLessons())
  }

  onChangePageSize(pageSize: number) {
    this.store.dispatch(changeVocabularyPageSize({ pageSize }))
  }

  onChangeCurrentPage(currentPage: number) {
    this.store.dispatch(changeVocabularyCurrentPage({ currentPage }))
  }

  changeVocabularyDateRange([fromDate, toDate]: Date[]) {
    this.store.dispatch(changeVocabularyDateRange({ fromDate, toDate }))
  }

  toggleIsCollapsed(isExpanded: boolean) {
    this.store.dispatch(toggleCollapsedVocabularyList({ isCollapsed: !isExpanded }))
  }

  toggleSelected(vocabularyId: number) {
    this.store.dispatch(toggleSelectVocabulary({ vocabularyId }))
  }

  clearAllSelected() {
    return this.store.dispatch(clearSelectedVocabularies())
  }

  markAllAsSellected() {
    return this.store.dispatch(markAllShowingVocabulariesAsSelected())
  }

  async playSound(path: string) {
    const url = `http://dictionary.cambridge.org${path}`
    try {
      await new Audio(url).play();
    } catch (error) {
      return null
    }
  }

  changeLessonFilter(lesson: LessonFilter) {
    this.store.dispatch(changeVocabularyLessonFilter({ lesson }))
  }

  showAssignLessonModal() {
    this.store.dispatch(showAssginLessonModal())
    this.popoverActionVisible = false
  }

  hideAssignLessonModal() {
    this.store.dispatch(hideAssginLessonModal())
    this.lessonToAssign = null
  }

  assignLesson() {
    this.store.dispatch(sendAssginLessonRequest({ lessonId: this.lessonToAssign }))
  }
}
