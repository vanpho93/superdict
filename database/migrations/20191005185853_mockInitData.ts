import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  // init user
  await knex('user').insert({ user_id: 1, email: 'vanpho01@gmail.com', password_hash: '123', name: 'Pho Nguyen' })

  // init word type
  await knex('word_type').insert([
    { word_type_id: 1, name: 'noun' },
    { word_type_id: 2, name: 'verb' },
    { word_type_id: 3, name: 'adjective' },
    { word_type_id: 4, name: 'adverb' },
    { word_type_id: 5, name: 'preposition' },
    { word_type_id: 6, name: 'pronoun' },
    { word_type_id: 7, name: 'determiner' },
    { word_type_id: 8, name: 'conjunction' },
    { word_type_id: 9, name: 'interjection' },
    { word_type_id: 10, name: 'noun phrase' },
    { word_type_id: 11, name: 'adverb phrase' },
    { word_type_id: 12, name: 'adjective phrase' },
    { word_type_id: 13, name: 'prepositional phrase' },
    { word_type_id: 14, name: 'exclamation' },
  ])

  // init lesson
  await knex('lesson').insert([
    { lesson_id: 1, user_id: 1, name: 'Unit 1. Getting started' },
    { lesson_id: 2, user_id: 1, name: 'Unit 2. Sport' },
  ])

  // init vocabulary
  await knex('vocabulary').insert([
    {
      vocabulary_id: 1,
      user_id: 1,
      word: 'hello',
      pronunciation: 'heˈloʊ',
      american_sound: '/media/english/us_pron/h/hel/hello/hello.mp3',
      british_sound: '/media/english/us_pron/h/hel/hello/hello.mp3',
      meaning: 'used when meeting or greeting someone',
      examples: `Hello, Paul. I haven't seen you for ages.|I know her vaguely - we've exchanged hellos a few times.|I just thought I'd call by and say hello.`,
      word_type_id: 1,
    },
    {
      vocabulary_id: 2,
      user_id: 1,
      word: 'see',
      pronunciation: 'siː',
      american_sound: '/media/english/us_pron/c/c__/c____/c.mp3',
      british_sound: '/media/english/us_pron/c/c__/c____/c.mp3',
      meaning: 'used when meeting or greeting someone',
      examples: `Hello, Paul. I haven't seen you for ages.|I know her vaguely - we've exchanged hellos a few times.|I just thought I'd call by and say hello.`,
      word_type_id: 2,
    },
  ])
}

export async function down(knex: Knex): Promise<any> {
  await knex('user').del().where({ user_id: 1 })
  await knex('lesson').del().whereIn('lesson_id', [1, 2])
  await knex('word_type').del().whereIn('word_type_id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
  await knex('vocabulary').del().whereIn('vocabulary_id', [1, 2])
}
