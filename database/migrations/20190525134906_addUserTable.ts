import * as Knex from 'knex'
import { addPrimaryKey, addCreated, addModified, addCurrencyValue } from '../tableBuilder'

export async function up(knex: Knex): Promise<any> {
  // add tables structures
  await knex.schema.createTable('tipster', table => {
    addPrimaryKey(table, 'tipster_id')
    table
      .string('name', 256)
      .notNullable()
      .unique()
    table.integer('win_count')
    table.integer('draw_count')
    table.integer('lose_count')
    table.integer('win_rate')
    table.integer('big_bet_win_rate')
    table.integer('balance')
    addCreated(table, knex)
  })
  await addModified('tipster', knex)
  await addCurrencyValue('tipster', 'yield', knex)
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('tipster')
}
