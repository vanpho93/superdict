import pg from 'pg'
import Knex from 'knex'
import { getEnvKey } from '../global-refs'
import { wrapIdentifier, postProcessResponse } from './transforms'

const PG_DECIMAL_OID = 1700
const PG_BIGINT_OID = 20
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat)
pg.types.setTypeParser(PG_BIGINT_OID, parseInt)

export const knex = Knex({
  client: 'postgresql',
  connection: getEnvKey('DATABASE_URL'),
  migrations: {
    directory: '../database/migrations',
    tableName: 'knex_migrations_new',
  },
  pool: {
    min: 1,
    max: 20,
  },
  wrapIdentifier,
  postProcessResponse,
  debug: false,
})
