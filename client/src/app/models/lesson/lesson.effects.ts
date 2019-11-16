import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, map, tap } from 'rxjs/operators'
import { NzMessageService } from 'ng-zorro-antd/message'
import { fetchLessons, fetchLessonsSuccess, sendCreateLessonRequest, createLessonSuccess } from './lesson.action'
import { FetchService } from '../../services'

@Injectable()

export class LessonEffects {
  fetchLessons$ = createEffect(() => this.actions$.pipe(
    ofType(fetchLessons, createLessonSuccess),
    switchMap(() => this.fetch.get('/lesson')),
    map(lessons => fetchLessonsSuccess({ lessons }))
  ))

  createLesson$ = createEffect(() => this.actions$.pipe(
    ofType(sendCreateLessonRequest),
    switchMap(({ name }) => this.fetch.post('/lesson', { name })),
    map(() => createLessonSuccess()),
    tap(() => this.message.success('New lesson created', { nzDuration: 3000, nzAnimate: true }))
  ))

  constructor(
    private actions$: Actions,
    private fetch: FetchService,
    private message: NzMessageService,
  ) { }
}
