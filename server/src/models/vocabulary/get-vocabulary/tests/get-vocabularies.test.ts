import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, Constants, Lesson, Vocabulary, deepOmit } from '../../../../global-refs'

const TEST_TITLE = 'GetVocabulary success'

function getDate(numberOfDates: number) {
  return new Date(numberOfDates * Constants.ONE_DAY_IN_MILLISECOND)
}

describe(TEST_TITLE, () => {
  let user1: UserWithToken
  let user2: UserWithToken

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user1 = await TestUtilities.createUser('vanpho01@gmail.com')
    user2 = await TestUtilities.createUser('vanpho02@gmail.com')
    await Lesson.createMany([
      { lessonId: 1, name: 'AAA', userId: user1.userId },
      { lessonId: 2, name: 'BBB', userId: user1.userId },
      { lessonId: 3, name: 'CCC', userId: user1.userId },
    ])
    await Vocabulary.createMany([
      {
        userId: user1.userId,
        lessonId: 1,
        word: 'one',
        wordTypeId: 1,
        created: getDate(1),
      },
      {
        userId: user1.userId,
        lessonId: 1,
        word: 'two',
        wordTypeId: 1,
        created: getDate(2),
      },
      {
        userId: user2.userId,
        lessonId: 2,
        word: 'three',
        wordTypeId: 1,
        created: getDate(2),
      },
      {
        userId: user1.userId,
        lessonId: 2,
        word: 'four',
        wordTypeId: 1,
        created: getDate(3),
      },
    ])
  })

  it(`${TEST_TITLE} can get vocabularies`, async () => {
    const response = await request(app)
      .get('/api/vocabulary')
      .set({ token: user1.token })
      .query({
        fromDate: getDate(1).getTime(),
        toDate: getDate(2).getTime(),
      })
    const expectedFields = ['userId', 'vocabularyId', 'created', 'modified', 'pronunciation', 'americanSound', 'britishSound', 'meaning', 'examples']
    const expectedResponse = {
      success: true,
      result:
        [
          { lessonId: 1, wordTypeId: 1, word: 'one', type: 'noun' },
          { lessonId: 1, wordTypeId: 1, word: 'two', type: 'noun' },
        ],
    }
    deepEqual(deepOmit(response.body, expectedFields), expectedResponse)
  })
})
