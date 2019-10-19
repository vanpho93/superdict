import * as Knex from 'knex'
import { addModified, addCascadeForeignKey, addCreated, addPrimaryKey } from '../tableBuilder'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('vocabulary', table => {
    addPrimaryKey(table, 'vocabulary_id')
    addCascadeForeignKey(table, 'user', { onDelete: 'CASCADE' })
    addCascadeForeignKey(table, 'lesson', { onDelete: 'CASCADE', notNullable: false })
    addCascadeForeignKey(table, 'word_type', { onDelete: 'CASCADE' })
    // detail
    table.string('word')
    table.string('pronunciation')
    table.string('american_sound')
    table.string('british_sound')
    table.string('meaning', 1024)
    table.string('examples', 2048)
    addCreated(table, knex)
  })
  await addModified('vocabulary', knex)
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('vocabulary')
}
