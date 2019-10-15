import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  // init user
  await knex('user').insert({ user_id: 1, email: 'vanpho01@gmail.com', password_hash: '123', name: 'Pho Nguyen' })

  // init word type
  await knex('word_type').insert([
    { name: 'noun' },
    { name: 'verb' },
    { name: 'adjective' },
    { name: 'adverb' },
    { name: 'preposition' },
    { name: 'pronoun' },
    { name: 'determiner' },
    { name: 'conjunction' },
    { name: 'interjection' },
    { name: 'noun phrase' },
    { name: 'adverb phrase' },
    { name: 'adjective phrase' },
    { name: 'prepositional phrase' },
    { name: 'exclamation' },
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
