import { NextFunction, Request, Response } from 'express'
import { handleUnexpectedError, Constants } from '../global-refs'

enum RouteError {
  INVALID_JSON = 'INVALID_JSON',
}

export function handleRouterError(error: Error, req: Request, res: Response, next: NextFunction) {
  const INVALID_JSON_SIGN = 'in JSON at'
  if (error.message.includes(INVALID_JSON_SIGN)) {
    return res.status(400).send({ success: false, message: RouteError.INVALID_JSON })
  }
  handleUnexpectedError(error)
  res.status(500).send({ success: false, message: Constants.INTERNAL_SERVER_ERROR })
}
