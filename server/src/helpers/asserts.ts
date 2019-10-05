export class ServerError extends Error {
  constructor(message: string, public statusCode = 400) {
    super(message)
  }
}

export function makeSure(expression: boolean, message = 'INVALID_MAKE_SURE', statusCode = 400) {
  if (expression) return
  throw new ServerError(message, statusCode)
}

export function mustExist(value: unknown, message = 'NOT_EXIST', statusCode = 400) {
  if (value) return
  throw new ServerError(message, statusCode)
}

export function mustMatchReg(value: string, reg: RegExp, message = 'NOT_MATCH_REGEX', statusCode = 400) {
  if (typeof value === 'string' && value.match(reg)) return
  throw new ServerError(message, statusCode)
}
