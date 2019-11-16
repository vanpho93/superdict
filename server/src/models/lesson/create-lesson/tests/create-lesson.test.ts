import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, deepOmit } from '../../../../global-refs'
import { ECreateLessonError } from '../metadata'

const TEST_TITLE = 'CreateLesson success'

describe(TEST_TITLE, () => {
  let user1: UserWithToken

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user1 = await TestUtilities.createUser('vanpho01@gmail.com')
  })

  it(`${TEST_TITLE} can create lesson`, async () => {
    const response = await request(app).post('/api/lesson').send({ name: 'UNIT 0' }).set({ token: user1.token })
    const expectedResponse = { success: true, result: { name: 'UNIT 0' } }
    deepEqual(deepOmit(response.body, ['created', 'userId', 'modified', 'created', 'lessonId']), expectedResponse)
  })

  it(`${TEST_TITLE} cannot create without token`, async () => {
    const response = await request(app).post('/api/lesson')
    deepEqual(response.body, { success: false, message: 'MUST_BE_USER' })
  })

  it(`${TEST_TITLE} cannot create with too length or too empty name`, async () => {
    const response1 = await request(app).post('/api/lesson').send({ name: '' }).set({ token: user1.token })
    const response2 = await request(app).post('/api/lesson').set({ token: user1.token }).send({
      name: 'REALLY_LONG_REALLY_LONG_REALLY_LONG_REALLY_LONG_REALLY_LONG_REALLY_LONG_REALLY_LONG_REALLY_LONG_',
    })
    deepEqual(response1.body, { success: false, message: ECreateLessonError.INVALID_NAME })
    deepEqual(response2.body, { success: false, message: ECreateLessonError.INVALID_NAME })
  })
})
