import { defaultTo } from 'lodash'

const STO_PRESALE_DURATIONS = [
  {
    startTime: '08/04/2019 00:00:00 GMT+0800',
    endTime: '08/04/2019 23:59:59 GMT+0800',
  },
  {
    startTime: '08/05/2019 20:00:00 GMT+0800',
    endTime: '08/05/2019 23:00:01 GMT+0800',
  },
  {
    startTime: '08/10/2019 20:00:00 GMT+0800',
    endTime: '08/11/2019 01:00:01 GMT+0800',
  },
  {
    startTime: '08/15/2019 20:00:00 GMT+0800',
    endTime: '08/15/2019 23:00:01 GMT+0800',
  },
  {
    startTime: '08/19/2019 01:00:00 GMT+0700',
    endTime: '08/19/2019 18:00:01 GMT+0700',
  },
  {
    startTime: '08/19/2019 19:00:00 GMT+0700',
    endTime: '08/20/2019 12:00:01 GMT+0700',
  },
  {
    startTime: '08/22/2019 19:00:00 GMT+0700',
    endTime: '08/22/2019 20:00:01 GMT+0700',
  },
]

const PERIOD_LONG = Number(defaultTo(process.env.SUPER_DICT_PAYMENT_PERIOD, 86400000))

export const Constants = {
  BANK_USER_ID: 0,
  ROOT_USER_EMAIL: 'support@unicwallet.io',
  ROOT_USER_ID: 1,
  MAX_DEPTH_LEVEL_ADD_SALE: 20,
  MAX_DEPTH_LEVEL_PER_GET_TREE: 22,
  SALT_ROUNDS: 8,
  ONE_DAY_IN_MILLISECOND: 86400000,
  ONE_DAY_IN_SECOND: 86400,
  ONE_ETHER: 1e18,
  COINBASE_API_ETH_RATE: 'https://api.coinbase.com/v2/prices/ETH-USD/buy',
  USD_TO_HERA: 10,
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  PRICE_OF_ONE_MINER_IN_ETH: 3,
  PRICE_UPGRADE_ONE_MINER_IN_ETH: 0.5,
  PRECISION: 9,
  STO_PRESALE_DURATIONS,
  PERIOD_LONG,
  MAXIMUM_INTEGER_4_BYTES: 2147483647,
  RETURN_BASIC_MINER_TIME: PERIOD_LONG * 30, // 30 days in millisecond
  RETURN_PLUS_MINER_TIME: PERIOD_LONG * 20, // 20 days in millisecond
  ROOT_DOMESTIC_EMAIL: 'unicornwallet01@gmail.com',
  // 180 days <=> 180% => 80% of each day is profit
  RANK_COMMISSION_RATE: 4 / 9,
  SYSTEM_COMMISSION_RATE: 8 / 15,
}
