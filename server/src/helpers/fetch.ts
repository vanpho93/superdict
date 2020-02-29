import { merge } from 'lodash'
import fetch, { RequestInfo, RequestInit } from 'node-fetch'
import { handleUnexpectedError } from '.'

export class Fetch {
  private static async fetchJSON(url: RequestInfo, init: RequestInit) {
    try {
      const response = await fetch(url, init)
      const result = await response.json()
      return result
    } catch (error) {
      handleUnexpectedError(error)
      throw new Error('CANNOT_FETCH')
    }
  }

  private static async fetchText(url: RequestInfo, init: RequestInit) {
    try {
      const response = await fetch(url, init)
      const result = await response.text()
      return result
    } catch (error) {
      handleUnexpectedError(error)
      throw new Error('CANNOT_FETCH')
    }
  }

  static async postJSON<T>(url: RequestInfo, init: RequestInit = undefined): Promise<T> {
    return this.fetchJSON(url, merge({ method: 'POST', headers: { 'Content-Type': 'application/json' } }, init))
  }

  static async getJSON<T>(url: RequestInfo, init: RequestInit = undefined): Promise<T> {
    return this.fetchJSON(url, init)
  }

  static async getText(url: RequestInfo, init: RequestInit = undefined): Promise<string> {
    return this.fetchText(url, init)
  }
}
