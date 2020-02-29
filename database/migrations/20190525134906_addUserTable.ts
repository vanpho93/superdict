import * as Knex from 'knex'
import { addPrimaryKey, addCreated, addModified } from '../tableBuilder'

export async function up(knex: Knex): Promise<any> {
  // add tables structures
  await knex.schema.createTable('user', table => {
    addPrimaryKey(table, 'user_id')
    table
      .string('email', 256)
      .notNullable()
      .unique()
    table
      .string('password_hash', 256)
      .notNullable()
    table
      .string('name', 256)
      .notNullable()
    addCreated(table, knex)
    // indexing
    table.index(['email'])
  })
  await addModified('user', knex)
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('user')
}
