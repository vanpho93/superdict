import pg from 'pg'
import Knex from 'knex'
import { getEnv } from '../global-refs'
import { toNumber } from 'lodash'
import { wrapIdentifier, postProcessResponse } from './transforms'

const PG_DECIMAL_OID = 1700
const PG_BIGINT_OID = 20
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat)
pg.types.setTypeParser(PG_BIGINT_OID, parseInt)

const {
  SUPER_DICT_POSTGRES_DATABASE,
  SUPER_DICT_POSTGRES_HOST,
  SUPER_DICT_POSTGRES_PASSWORD,
  SUPER_DICT_POSTGRES_PORT,
  SUPER_DICT_POSTGRES_CONNECTION_LIMIT,
  SUPER_DICT_POSTGRES_USERNAME,
  SUPER_DICT_POSTGRES_SSL,
} = getEnv()

export const knex = Knex({
  client: 'postgresql',
  connection: {
    host : SUPER_DICT_POSTGRES_HOST,
    user : SUPER_DICT_POSTGRES_USERNAME,
    password : SUPER_DICT_POSTGRES_PASSWORD,
    database : SUPER_DICT_POSTGRES_DATABASE,
    port: toNumber(SUPER_DICT_POSTGRES_PORT),
    ssl: SUPER_DICT_POSTGRES_SSL === 'true',
  },
  pool: {
    min: 0,
    max: toNumber(SUPER_DICT_POSTGRES_CONNECTION_LIMIT),
  },
  wrapIdentifier,
  postProcessResponse,
  debug: false,
})
