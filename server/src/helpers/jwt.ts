import { sign, verify, VerifyErrors } from 'jsonwebtoken'
import { Settings } from '../global-refs'
import { getEnvKey } from './'

const SUPER_DICT_JWT_SECRET_KEY = getEnvKey('SUPER_DICT_JWT_SECRET_KEY')

export function createToken(obj: object, expiresIn = Settings.SESSION_EXPIRED_TIME): Promise<string> {
  return new Promise((resolve, reject) => {
    sign(obj, SUPER_DICT_JWT_SECRET_KEY, { expiresIn }, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

export function verifyToken(token: string): Promise<{ userId: number, iat: number, exp: number }> {
  return new Promise((resolve, reject) => {
    verify(token, SUPER_DICT_JWT_SECRET_KEY, (error: VerifyErrors, decoded: object | string) => {
      if (error) return reject(error)
      resolve(decoded as { userId: number, iat: number, exp: number })
    })
  })
}
