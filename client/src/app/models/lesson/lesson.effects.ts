import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetchLessons, fetchLessonsSuccess } from './lesson.action'
import { switchMap, map } from 'rxjs/operators'
import { FetchService } from '../../services'

@Injectable()

export class LessonEffects {
  fetchLessons$ = createEffect(() => this.actions$.pipe(
    ofType(fetchLessons),
    switchMap(() => this.fetch.get('/lesson')),
    map(lessons => fetchLessonsSuccess({ lessons }))
  ))

  constructor(
    private actions$: Actions,
    private fetch: FetchService,
  ) { }
}
