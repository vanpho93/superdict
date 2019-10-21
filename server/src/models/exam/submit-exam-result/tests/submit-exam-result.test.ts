import td from 'testdouble'
import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, Constants, Vocabulary, IVocabulary, WordType, deepOmit } from '../../../../global-refs'

const TEST_TITLE = 'Submit exam success'

function getDate(numberOfDates: number) {
  return new Date(numberOfDates * Constants.ONE_DAY_IN_MILLISECOND)
}

describe(TEST_TITLE, () => {
  let user1: UserWithToken
  let vocabularies: IVocabulary[]

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user1 = await TestUtilities.createUser('vanpho01@gmail.com')
    const wordType = await WordType.create({ name: 'noun' })
    vocabularies = await Vocabulary.createMany([
      {
        userId: user1.userId,
        word: 'one',
        wordTypeId: wordType.wordTypeId,
        dueDate: getDate(0),
        lastReviewed: getDate(1),
      },
      {
        userId: user1.userId,
        word: 'two',
        wordTypeId: wordType.wordTypeId,
        dueDate: getDate(0),
        lastReviewed: getDate(1),
      },
      {
        userId: user1.userId,
        word: 'three',
        wordTypeId: wordType.wordTypeId,
        dueDate: getDate(0),
        lastReviewed: getDate(1),
      },
    ])
    td.replace(Date, 'now')
  })

  it(`${TEST_TITLE}`, async () => {
    const [v1, , v3] = vocabularies
    td.when(Date.now()).thenReturn(86400000 * 2)
    await request(app).post('/api/exam-result').send({
      result: [
        { vocabularyId: v1.vocabularyId, performanceRating: 1 },
        { vocabularyId: v3.vocabularyId, performanceRating: 0.5 },
      ],
    })
    const vocabulariesAfter = await Vocabulary.findAll({}, builder => builder.orderBy('vocabularyId'))

    const exceptedFields = [
      'vocabularyId', 'userId', 'lessonId', 'wordTypeId',
      'pronunciation', 'americanSound', 'britishSound',
      'examples', 'created', 'modified', 'meaning',
    ]
    deepEqual(deepOmit(vocabulariesAfter, exceptedFields), [
      {
        word: 'one',
        lastReviewed: new Date('1970-01-02T00:00:00.000Z'),
        dueDate: new Date('1970-01-05T14:09:36.000Z'),
        intervalTime: 223776000,
        difficulty: 0.241176,
        percentOverdue: 1,
      },
      {
        word: 'two',
        lastReviewed: new Date('1970-01-02T00:00:00.000Z'),
        dueDate: new Date('1970-01-01T00:00:00.000Z'),
        intervalTime: 86400,
        difficulty: 0.3,
        percentOverdue: 1,
      },
      {
        word: 'three',
        lastReviewed: new Date('1970-01-02T00:00:00.000Z'),
        dueDate: new Date('1970-01-04T00:00:00.000Z'),
        intervalTime: 86400000,
        difficulty: 0.505882,
        percentOverdue: 1,
      },
    ])
  })
})
