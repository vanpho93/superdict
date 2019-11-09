import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators'
import { VocabularyService } from './vocabulary.service'
import {
  fetchVocabulariesSuccess,
  fetchVocabularies,
  changeVocabularyCurrentPage,
  changeVocabularyDateRange,
  changeVocabularyPageSize,
} from './vocabulary.action'
import { Store } from '@ngrx/store'
import { State } from '..'

@Injectable()
export class VocabularyEffects {

  fetch$ = createEffect(() => {
    const vocabularyState$ = this.store.select('vocabulary')
    const filterByActionType = ofType(fetchVocabularies)
    const fetchVocabulary$ = this.actions$.pipe(filterByActionType, map(() => 1))

    return fetchVocabulary$.pipe(
      withLatestFrom(vocabularyState$),
      mergeMap(([_, { filter, paging }]) => this.vocabularyService.fetchVocabularies({
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          pageSize: paging.pageSize,
          currentPage: paging.currentPage,
        })
        .pipe(
          map(({ vocabularies, total }) => (fetchVocabulariesSuccess({ vocabularies, total }))),
          catchError(() => EMPTY)
        )
      ),
    )
  })

  reFetch$ = createEffect(() => {
    const filterByActionTypes = ofType(
      changeVocabularyCurrentPage,
      changeVocabularyDateRange,
      changeVocabularyPageSize
    )
    return this.actions$.pipe(filterByActionTypes, map(() => ({ type: '[Vocabulary Screen] Send fetch vocabularies request' })))
  })

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private vocabularyService: VocabularyService
  ) {}
}
