import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { map, filter, tap } from 'rxjs/operators'
import { UserState, State } from '../models'

@Injectable({
  providedIn: 'root'
})

export class MustBeUserGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
    .pipe(
      select('user'),
      filter((userState: UserState) => userState.isCheckTokenDone),
      map(user => !!user.state),
      tap(isCheckTokenSuccess => {
        if (!isCheckTokenSuccess) this.router.navigate(['/sign-in'])
      })
    )
  }
}
