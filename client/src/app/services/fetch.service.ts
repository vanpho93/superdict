import { Injectable } from '@angular/core'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import * as qs from 'qs'

const ROOT_URL = 'https://superdict.herokuapp.com/api'
// const ROOT_URL = 'http://localhost:5000/api'

@Injectable({ providedIn: 'root' })

export class FetchService {

  constructor() { }

  post(url: string, body: {}) {
    return ajax({
      url: `${ROOT_URL}${url}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('TOKEN'),
      },
      body,
    })
    .pipe(map(ajaxResponse => ajaxResponse.response.result))
  }

  put(url: string, body: {}) {
    return ajax({
      url: `${ROOT_URL}${url}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('TOKEN'),
      },
      body,
    })
    .pipe(map(ajaxResponse => ajaxResponse.response.result))
  }

  get(url: string, query: {} = null) {
    return ajax({
      url: `${ROOT_URL}${url}?${qs.stringify(query)}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('TOKEN'),
      },
    })
    .pipe(map(ajaxResponse => ajaxResponse.response.result))
  }
}
