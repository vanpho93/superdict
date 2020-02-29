import * as Knex from 'knex'
// tslint:disable-next-line: no-duplicate-imports
import { CreateTableBuilder } from 'knex'
import { IAddFlagOptions } from './metadata'

export const addCreated = (table: CreateTableBuilder, knex: Knex): void => {
  table
    .dateTime('created')
    .notNullable()
    .defaultTo(knex.raw('current_timestamp'))
}

export const addModified = async (tableName: string, knex: Knex) => {
  await knex.schema.alterTable(tableName, table => {
    table
      .dateTime('modified')
      .notNullable()
      .defaultTo(knex.raw('current_timestamp'))
  })
  const sql = `CREATE TRIGGER ${tableName}_modified
  BEFORE UPDATE ON "${tableName}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();`
  return knex.raw(sql)
}

export const addDeleted = (table: CreateTableBuilder): void => {
  table
    .dateTime('deleted')
}

export const removeDeleted = (table: CreateTableBuilder): void => {
  table
    .dropColumn('deleted')
}

export const addPrimaryKey = (table: CreateTableBuilder, name: string): void => {
  table
    .increments(name)
    .unsigned()
    .primary()
}

export const addCodeName = (table: CreateTableBuilder): void => {
  table
    .string('code_name', 45)
    .notNullable()
}

export const addFlag = (table: CreateTableBuilder, flagName: string, options: IAddFlagOptions = { defaultTo: false }): void => {
  table
    .boolean(flagName)
    .notNullable()
    .defaultTo(options.defaultTo)
}

export const addRate = (table: CreateTableBuilder): void => {
  table
    .decimal('rate', 9, 9)
    .notNullable()
}

export const addCurrencyValue = async (tableName: string, columnName: string, knex: Knex) => {
  await knex.schema.alterTable(tableName, table => {
    table
      .decimal(columnName, 10, 3)
      .notNullable()
      .defaultTo(0)
  })
  const sql = `
    ALTER TABLE "${tableName}"
    ADD CONSTRAINT "${tableName}_${columnName}_must_be_positive" CHECK (${columnName} >= 0)
  `
  return knex.schema.raw(sql)
}
