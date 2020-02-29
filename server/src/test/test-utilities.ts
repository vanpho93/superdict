import { isNil } from 'lodash'
import request from 'supertest'
import { deepEqual } from 'assert'
import './test-helper'
import { app } from '../app'
import { TestConstants, EGlobalError, IUser, getEnvKey, User, UserWithToken } from '../global-refs'

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

  private static getToken(email: string) {
    return `SUPER_TOKEN:${getEnvKey('SUPER_DICT_SUPER_PASSWORD')}:${email}`
  }

  public static async createUser(email: string): Promise<UserWithToken> {
    const user = await User.create({
      email,
      passwordHash: '$2b$08$HwFcwX64dZyjT6b.NHnxP.DvxzYE.A8SwYVoF4PP86USSDQbCsZi6', // password@123
      name: email.split('@')[0],
    })
    return { ...user, token: this.getToken(email) }
  }

  public static async getUser(email: string): Promise<UserWithToken> {
    const user = await User.findOne({ email })
    if (isNil(user)) throw 'CANNOT_FIND_USER'
    return { ...user, token: this.getToken(email) }
  }

  public static getTestTitle(filename: string) {
    const startIndex = filename.indexOf('/src/') + '/src/'.length
    const dirnameTrimmed = filename.substring(startIndex, filename.length - '.test.ts'.length)
    return dirnameTrimmed
  }
}
