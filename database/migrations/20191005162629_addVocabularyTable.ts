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
    // sm2
    table
      .dateTime('last_reviewed')
      .notNullable()
      .defaultTo(knex.raw('current_timestamp'))
    table
      .dateTime('due_date')
      .notNullable()
      .defaultTo(knex.raw('current_timestamp'))
    table
      .float('interval_time')
      .defaultTo(86400) // one day in second
    table
      .float('difficulty')
      .defaultTo(0.3)
    table
      .float('percent_overdue')
      .defaultTo(1)
    table.index(['due_date'])
    table.index(['percent_overdue'])
  })
  await addModified('vocabulary', knex)
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('vocabulary')
}
