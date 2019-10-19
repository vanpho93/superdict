import redis from 'redis'
import { promisify } from 'util'
import { getEnvKey, handleUnexpectedError, exist, verifyToken } from '../global-refs'

const redisClient = redis.createClient(getEnvKey('REDIS_URL'))

const BLACKLIST_TOKEN_PREFIX = 'blacklist-token:'

export enum ERedisKey {
  LAST_STATISTIC_ANNOUNCEMENT = 'LAST_STATISTIC_ANNOUNCEMENT',
}

export class Redis {
  static set(key: string, seconds: number, value: string) {
    return promisify(redisClient.setex).bind(redisClient)(key, seconds, value)
  }

  static get(key: string) {
    return promisify(redisClient.get).bind(redisClient)(key)
  }

  static del(key: string) {
    return new Promise(resolve => redisClient.del(key, resolve))
  }

  static async addTokenToBlackList(token: string) {
    const expriredTime = await this.getExpiredTime(token)
    const blackListToken = `${BLACKLIST_TOKEN_PREFIX}${token}`
    const NONSENSE_VALUE = ''
    return this.set(blackListToken, expriredTime, NONSENSE_VALUE)
  }

  private static async getExpiredTime(token: string) {
    const { exp } = await verifyToken(token)
    const nowInSecond = Number((new Date().getTime() / 1000).toFixed())
    const oneHourInSecond = 3600
    return exp - nowInSecond + oneHourInSecond
  }

  static async isTokenInBlackList(token: string) {
    const blackListToken = `${BLACKLIST_TOKEN_PREFIX}${token}`
    return exist(await this.get(blackListToken))
  }

  static async flushall() {
    return promisify(redisClient.flushall).bind(redisClient)()
  }
}

redisClient.on('error', function (error) {
  handleUnexpectedError(error)
})
