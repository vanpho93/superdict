import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, Lesson, deepOmit } from '../../../../global-refs'

const TEST_TITLE = 'GetVocabulary success'

describe(TEST_TITLE, () => {
  let user1: UserWithToken
  let user2: UserWithToken

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user1 = await TestUtilities.createUser('vanpho01@gmail.com')
    user2 = await TestUtilities.createUser('vanpho02@gmail.com')
    await Lesson.createMany([
      { lessonId: 1, name: 'AAA', userId: user1.userId },
      { lessonId: 2, name: 'BBB', userId: user1.userId },
      { lessonId: 3, name: 'CCC', userId: user2.userId },
    ])
  })

  it(`${TEST_TITLE} can get vocabularies`, async () => {
    const response = await request(app).get('/api/lesson').set({ token: user1.token })
    const expectedResponse = {
      success: true,
      result:
        [{ lessonId: 1, name: 'AAA' }, { lessonId: 2, name: 'BBB' }],
    }
    deepEqual(deepOmit(response.body, ['created', 'userId', 'modified', 'created']), expectedResponse)
  })

  it(`${TEST_TITLE} cannot get without token`, async () => {
    const response = await request(app).get('/api/lesson')
    deepEqual(response.body, { success: false, message: 'MUST_BE_USER' })
  })
})
