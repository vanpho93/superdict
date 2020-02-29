export enum EEnviroment {
  TEST = 'test',
  LOCAL = 'local',
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
}

interface IProcessEnv {
  // SYSTEM
  NODE_ENV: EEnviroment
  PORT: string
  SUPER_DICT_SUPER_PASSWORD: string

  // POSTGRESQL
  DATABASE_URL: string

  // AWS
  AWS_ACCESSS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_BUCKET_NAME: string
  AWS_REGION: string

  // REDIS
  REDIS_URL: string

  // SCANNER
  SUPER_DICT_SCAN_TASKS: string

  // SENTRY
  SENTRY_DSN: string

  // JWT
  SUPER_DICT_JWT_SECRET_KEY: string
}

export function getEnv(): IProcessEnv {
// tslint:disable-next-line: no-any
  return process.env as any
}

export function getEnvKey(key: keyof IProcessEnv): string {
  return getEnv()[key]
}
