import * as Knex from 'knex'
import { addModified, addCreated, addPrimaryKey } from '../tableBuilder'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('word_class', table => {
    addPrimaryKey(table, 'word_class_id')
    table.string('name')
    addCreated(table, knex)
  })
  await addModified('word_class', knex)
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('word_class')
}
