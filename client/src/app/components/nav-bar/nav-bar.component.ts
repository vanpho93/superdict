import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { State } from '../../models'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})

export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>

  ngOnInit() {
  }

  constructor(private router: Router, private store: Store<State>) {
    this.isLoggedIn$ = this.store.pipe(select('user'), select('state'), map(user => !!user))
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true)
  }
}
