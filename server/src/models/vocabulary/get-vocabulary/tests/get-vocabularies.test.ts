import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken } from '../../../../global-refs'

const TEST_TITLE = 'GetVocabulary success'

describe(TEST_TITLE, () => {
  let user: UserWithToken

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user = await TestUtilities.createUser('vanpho01@gmail.com')
  })

  it.only(`${TEST_TITLE} can get vocabularies`, async () => {
    const response = await request(app).get('/api/vocabulary').set({ token: user.token })
    console.log(response.text)
  })
})
