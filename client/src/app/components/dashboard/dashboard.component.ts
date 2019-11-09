import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IUser, State } from '../../models'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  user$: Observable<IUser>

  constructor(private store: Store<State>) {
    this.user$ = store.pipe(select('user'), select('state'))
  }

  ngOnInit() {
  }
}
