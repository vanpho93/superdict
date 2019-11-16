import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, Constants, Lesson, Vocabulary, IWordType, WordType } from '../../../../global-refs'
import { EAssignLessonError } from '../metadata'

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
    ])
    await Vocabulary.createMany([
      {
        vocabularyId: 1,
        userId: user1.userId,
        lessonId: 1,
        word: 'one',
        wordTypeId: wordType.wordTypeId,
        created: getDate(1),
      },
      {
        vocabularyId: 2,
        userId: user1.userId,
        lessonId: null,
        word: 'two',
        wordTypeId: wordType.wordTypeId,
        created: getDate(2),
      },
      {
        vocabularyId: 3,
        userId: user2.userId,
        lessonId: null,
        word: 'two',
        wordTypeId: wordType.wordTypeId,
        created: getDate(2),
      },
    ])
  })

  it(`${TEST_TITLE} can get vocabularies`, async () => {
    await request(app)
      .put('/api/vocabulary/assign-lesson')
      .set({ token: user1.token })
      .send({
        lessonId: 2,
        vocabularyIds: [1, 2, 3],
      })
    const vocabularies = await Vocabulary.findAll({}, builder => builder.select(['lessonId', 'vocabularyId']).orderBy('vocabularyId'))
    deepEqual(vocabularies, [
      { vocabularyId: 1, lessonId: 2 },
      { vocabularyId: 2, lessonId: 2 },
      { vocabularyId: 3, lessonId: null },
    ])
  })

  it(`${TEST_TITLE} cannot assign to others' lesson`, async () => {
    const response = await request(app)
      .put('/api/vocabulary/assign-lesson')
      .set({ token: user2.token })
      .send({
        lessonId: 2,
        vocabularyIds: [1, 2, 3],
      })
    deepEqual(response.body, { success: false, message: EAssignLessonError.CANNOT_FIND_LESSON })
  })
})
