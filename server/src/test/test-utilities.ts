import request from 'supertest'
import { deepEqual } from 'assert'
import { app } from '../app'
import { TestConstants, EGlobalError, IUser } from '../global-refs'

export interface IUserWithToken extends IUser {
  token: string
}

export class TestUtilities {
  public static mustBeUser(TEST_TITLE: string, methodName: string, url: string) {
    it(`${TEST_TITLE} given an invalid token, it should throw an error`, async () => {
      const requestMethod = this.getRequestMethod(methodName, url)
      const response = await requestMethod.set({ token: TestConstants.INVALID_TOKEN })
      deepEqual(response.body, { success: false, message: EGlobalError.MUST_BE_USER })
    })
  }

  private static getRequestMethod(methodName: string, url: string) {
    if (methodName === 'GET') return request(app).get(url)
    if (methodName === 'POST') return request(app).post(url)
    if (methodName === 'PUT') return request(app).put(url)
    if (methodName === 'DELETE') return request(app).delete(url)
  }
}
