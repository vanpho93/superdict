import * as Knex from 'knex'
import { addModified, addCreated, addPrimaryKey } from '../tableBuilder'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('word_type', table => {
    addPrimaryKey(table, 'word_type_id')
    table.string('name').unique()
    addCreated(table, knex)
  })
  await addModified('word_type', knex)
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('word_type')
}
