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
    table.integer('no')
    table.bigInteger('balance')
    addCreated(table, knex)
  })
  await addModified('tipster', knex)
  await addCurrencyValue('tipster', 'win_count', knex)
  await addCurrencyValue('tipster', 'draw_count', knex)
  await addCurrencyValue('tipster', 'lose_count', knex)
  await addCurrencyValue('tipster', 'total_bet', knex)

  await addCurrencyValue('tipster', 'win_rate', knex)
  await addCurrencyValue('tipster', 'big_bet_win_rate', knex)
  await addCurrencyValue('tipster', 'yield', knex)
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('tipster')
}
