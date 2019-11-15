import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { UserService } from './user.service'
import {
  signInSuccess, signInFailure, checkTokenSuccess, sendSignOutRequest,
checkTokenFailure, signOutSuccess, signIn, checkToken,
} from './user.action'

@Injectable()
export class UserEffects {
  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(signIn),
    switchMap(({ email, password }) => this.userService.signIn(email, password)
      .pipe(
        map(user => signInSuccess({ user })),
        tap(({ user }) => {
          this.router.navigate(['/dashboard'])
          localStorage.setItem('TOKEN', user.token)
        }),
        catchError(error => {
          return of(signInFailure({ errorMessage: error.response.message }))
        })
      ))
  ))

  checkToken$ = createEffect(() => this.actions$.pipe(
    ofType(checkToken),
    switchMap(() => this.userService.checkToken()
      .pipe(
        map(user => checkTokenSuccess({ user })),
        tap(({ user }) => localStorage.setItem('TOKEN', user.token)),
        catchError(error => {
          console.log(error)
          return of(checkTokenFailure())
        })
      )))
  )

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(sendSignOutRequest),
    switchMap(() => this.userService.signOut()
      .pipe(
        map(() => signOutSuccess()),
        catchError(() => {
          return of(signOutSuccess())
        }),
        tap(() => {
          localStorage.removeItem('TOKEN')
          this.router.navigate(['/sign-in'])
        })
      ))
  ))

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) { }
}
