import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State, checkToken } from './models'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  isCheckTokenDone$: Observable<number>

  constructor(private store: Store<State>) {
    this.isCheckTokenDone$ = store.pipe(select('user'), select('isCheckTokenDone'))
  }

  ngOnInit() {
    if (environment.defaultState) return
    this.store.dispatch(checkToken())
  }
}
