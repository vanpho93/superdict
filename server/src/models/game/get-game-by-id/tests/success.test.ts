import td from 'testdouble'
import request from 'supertest'
import { ok } from 'assert'
import { TestUtilities, Fetch } from '../../../../global-refs'
import { app } from '../../../../app'
import { sampleHtml } from '../metadata'

const TEST_TITLE = TestUtilities.getTestTitle(__filename)

describe(TEST_TITLE, () => {
  beforeEach(`${TEST_TITLE} init database`, async () => {
    td.replace(Fetch, 'getText', () => sampleHtml)
  })

  it(`${TEST_TITLE} Given SOMETHING THAT IS WEIRD, it should throw an error`, async () => {
    const { body } = await request(app).get('/api/game/44785')
    ok(body.result)
  })
})
