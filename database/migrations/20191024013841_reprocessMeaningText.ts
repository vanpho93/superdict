import * as Knex from 'knex'

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace)
}

function processMeaningText(meaning: string) {
  const trimmed = meaning.trim()
  const removedColon = trimmed.endsWith(':') ? trimmed.slice(0, -1) : trimmed
  const DOUBLE_SPACES = '  '
  const SINGLE_SPACE = ' '
  const NEW_LINE = '\n'
  return replaceAll(replaceAll(removedColon, DOUBLE_SPACES, SINGLE_SPACE), NEW_LINE, SINGLE_SPACE)
}

export async function up(knex: Knex): Promise<any> {
  const vocabularies = await knex('vocabulary').select()
  for (let index = 0; index < vocabularies.length; index++) {
    console.log(vocabularies[index])
    const { vocabulary_id, meaning } = vocabularies[index]
    await knex('vocabulary').update({ meaning: processMeaningText(meaning) }).where({ vocabulary_id })
  }
}

export async function down(knex: Knex): Promise<any> {
  return
}
