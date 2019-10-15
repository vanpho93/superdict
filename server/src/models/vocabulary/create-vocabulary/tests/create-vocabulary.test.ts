import { deepEqual } from 'assert'
import request from 'supertest'
import { app } from '../../../../app'
import { TestUtilities, UserWithToken, Vocabulary, deepOmit } from '../../../../global-refs'
import { ICreateVocabularyInput } from '../metadata'

const TEST_TITLE = 'CreateVocabulary success'

describe(TEST_TITLE, () => {
  let user1: UserWithToken

  beforeEach(`${TEST_TITLE} prepare database`, async () => {
    user1 = await TestUtilities.createUser('vanpho01@gmail.com')
  })

  it(`${TEST_TITLE} can create vocabulary`, async () => {
    const vocabularyInput: ICreateVocabularyInput = {
      word: 'miss',
      meaning: 'miss meaning',
      examples: 'abcd|xyz',
      americanSound: 'aaa',
      britishSound: 'bbb',
      wordType: 'verb',
      pronunciation: 'mi:s',
    }
    const response = await request(app)
      .post('/api/vocabulary')
      .send(vocabularyInput)
      .set({ token: user1.token })
    deepEqual(response.body, { success: true })
    const vocabularies = await Vocabulary.findAll({})
    deepEqual(deepOmit(vocabularies, ['vocabularyId', 'created', 'modified', 'userId']), [{
      lessonId: null,
      wordTypeId: 2,
      word: 'miss',
      pronunciation: 'mi:s',
      americanSound: 'aaa',
      britishSound: 'bbb',
      meaning: 'miss meaning',
      examples: 'abcd|xyz',
    }])
  })
})