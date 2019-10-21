import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, Constants, Lesson, Vocabulary, deepOmit, IWordType, WordType } from '../../../../global-refs'

const TEST_TITLE = 'GetVocabulary success'

function getDate(numberOfDates: number) {
  return new Date(numberOfDates * Constants.ONE_DAY_IN_MILLISECOND)
}

describe(TEST_TITLE, () => {
  let user1: UserWithToken
  let user2: UserWithToken
  let wordType: IWordType

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user1 = await TestUtilities.createUser('vanpho01@gmail.com')
    user2 = await TestUtilities.createUser('vanpho02@gmail.com')
    wordType = await WordType.create({ name: 'verb' })
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
        wordTypeId: wordType.wordTypeId,
        created: getDate(1),
      },
      {
        userId: user1.userId,
        lessonId: 1,
        word: 'two',
        wordTypeId: wordType.wordTypeId,
        created: getDate(2),
      },
      {
        userId: user1.userId,
        lessonId: 1,
        word: 'two',
        wordTypeId: wordType.wordTypeId,
        created: getDate(2),
      },
      {
        userId: user1.userId,
        lessonId: 1,
        word: 'two',
        wordTypeId: wordType.wordTypeId,
        created: getDate(2),
      },
      {
        userId: user2.userId,
        lessonId: 2,
        word: 'three',
        wordTypeId: wordType.wordTypeId,
        created: getDate(2),
      },
      {
        userId: user1.userId,
        lessonId: 2,
        word: 'four',
        wordTypeId: wordType.wordTypeId,
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
        page: 1,
        pageSize: 2,
      })
    const expectedFields = [
      'userId', 'vocabularyId', 'created', 'modified',
      'pronunciation', 'americanSound', 'britishSound',
      'meaning', 'examples', 'lastReviewed', 'dueDate',
    ]
    const expectedResponse = {
      success: true,
      result:
      {
        total: 4,
        vocabularies:
          [
            {
              lessonId: 1,
              wordTypeId: wordType.wordTypeId,
              word: 'one',
              intervalTime: 86400,
              difficulty: 0.3,
              percentOverdue: 1,
              type: 'verb',
            },
            {
              lessonId: 1,
              wordTypeId: wordType.wordTypeId,
              word: 'two',
              intervalTime: 86400,
              difficulty: 0.3,
              percentOverdue: 1,
              type: 'verb',
            },
          ],
      },
    }
    deepEqual(deepOmit(response.body, expectedFields), expectedResponse)
  })
})
