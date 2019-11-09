import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State, IUser, sendSignOutRequest } from '../../models'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})

export class ProfileComponent implements OnInit {
  user$: Observable<IUser>
  isSignOutLoading$: Observable<string>

  constructor(private store: Store<State>) {
    this.user$ = this.store.pipe(select('user'), select('state'))
    this.isSignOutLoading$ = this.store.pipe(select('user'), select('isLoading'))
  }

  ngOnInit() {
  }

  signOut() {
    this.store.dispatch(sendSignOutRequest())
  }
}
