import { Injectable } from '@angular/core'
import { FetchService } from '../../services'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private fetch: FetchService) { }

  signIn() {
    const body = {
      email: 'vanpho01@gmail.com',
      password: 'SUPER_PASSWORD@123XYZ@'
    }
    return this.fetch.post('/user/login', body)
  }

  checkToken() {
    return this.fetch.get('/user/check')
  }

  signOut() {
    return this.fetch.post('/user/logout', {})
  }
}
