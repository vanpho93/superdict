import { flatten } from 'lodash'
import request from 'supertest'
import { equal } from 'assert'
import { TestUtilities, Tipster } from '../../../../global-refs'
import { app } from '../../../../app'

const TEST_TITLE = TestUtilities.getTestTitle(__filename)

describe(TEST_TITLE, () => {
  beforeEach(`${TEST_TITLE} init database`, async () => {
    await Tipster.createMany([
      {
        tipsterId: 9400,
        name: 'Cruiser',
        no: 572,
        balance: 1265938,
        winCount: 53,
        drawCount: 16,
        loseCount: 49.5,
        totalBet: 118.5,
        winRate: 0.52,
        bigBetWinRate: 0.54,
        yield: 0.034,
      },
      {
        tipsterId: 188968,
        name: 'Suria',
        no: 573,
        balance: 1265625,
        winCount: 83.5,
        drawCount: 16,
        loseCount: 74.5,
        totalBet: 174,
        winRate: 0.53,
        bigBetWinRate: 0.62,
        yield: 0.043,
      },
    ])
  })

  it(`${TEST_TITLE} Can get tipster by names`, async () => {
    const { body: body1 } = await request(app).get('/api/tipster').query({ names: 'Cruiser' })
    equal(body1.result[0].tipsterId, 9400)

    const { body: body2 } = await request(app).get('/api/tipster').query({ names: ['Suria', 'Cruiser'] })
    equal(body2.result.length, 2)

    const { body: body3 } = await request(app).get('/api/tipster')
    equal(body3.result.length, 0)
  })
})
