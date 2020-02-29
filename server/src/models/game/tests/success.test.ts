import td from 'testdouble'
import request from 'supertest'
import { deepEqual } from 'assert'
import { TestUtilities, Fetch } from '../../../global-refs'
import { app } from '../../../app'
import { sampleHtml } from '../metadata'

const TEST_TITLE = TestUtilities.getTestTitle(__filename)

describe(TEST_TITLE, () => {
  beforeEach(`${TEST_TITLE} init database`, async () => {
    td.replace(Fetch, 'getText', () => sampleHtml)
  })

  it(`${TEST_TITLE} Given SOMETHING THAT IS WEIRD, it should throw an error`, async () => {
    const { body } = await request(app).get('/api/pending-game')
    deepEqual(body, {
      success: true,
      result:
        [{
          leagueName: 'English Premier League',
          home: 'Brighton',
          away: 'Crystal Palace',
          haHandicap: '0 : 1/4',
          homeRate: 1.9,
          awayRate: 2,
          ouHandicap: '2 1/4',
          overRate: 2.1,
          underRate: 1.8,
          time: '8:30pm\n  \nSaturday, 29 Feb 2020\n (in 12 minutes time)',
          gameId: 44785,
        },
        {
          leagueName: 'English League Championship',
          home: 'Hull City',
          away: 'Leeds United',
          haHandicap: '1 1/2 : 0',
          homeRate: 1.975,
          awayRate: 1.925,
          ouHandicap: '3',
          overRate: 2.05,
          underRate: 1.825,
          time: '8:30pm\n  \nSaturday, 29 Feb 2020\n (in 12 minutes time)',
          gameId: 44912,
        },
        {
          leagueName: 'Italian Serie A ',
          home: 'Lazio',
          away: 'Bologna',
          haHandicap: '0 : 1',
          homeRate: 1.95,
          awayRate: 1.95,
          ouHandicap: '3',
          overRate: 1.925,
          underRate: 1.975,
          time: '10:00pm\n  \nSaturday, 29 Feb 2020\n (in 2 hours time)',
          gameId: 44820,
        },
        {
          leagueName: 'Italan Serie B',
          home: 'Benevento',
          away: 'Spezia',
          haHandicap: '0 : 1/2',
          homeRate: 1.825,
          awayRate: 2.05,
          ouHandicap: '2 1/4',
          overRate: 1.85,
          underRate: 2.025,
          time: '10:00pm\n  \nSaturday, 29 Feb 2020\n (in 2 hours time)',
          gameId: 44932,
        }],
    })
  })
})
