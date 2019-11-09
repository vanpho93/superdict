import { FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { signIn, IUser } from '../../models'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})

export class SignInComponent implements OnInit {
  validateForm = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    remember: [true]
  })

  user$: Observable<IUser>
  isLoading$: Observable<boolean>

  constructor(private store: Store<{ user: IUser }>, private fb: FormBuilder) {
    this.user$ = this.store.pipe(select('user'), select('state'))
    this.isLoading$ = this.store.pipe(select('user'), select('isLoading'))
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
    }
    this.store.dispatch(signIn(this.validateForm.value))
  }

  ngOnInit(): void {
  }
}
