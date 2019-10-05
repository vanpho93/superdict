import * as Knex from 'knex'
import { addModified, addCascadeForeignKey, addCreated, addPrimaryKey } from '../tableBuilder'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('lesson', table => {
    addPrimaryKey(table, 'lesson_id')
    addCascadeForeignKey(table, 'user', { onDelete: 'CASCADE' })
    addCreated(table, knex)
  })
  await addModified('lesson', knex)
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('lesson')
}
