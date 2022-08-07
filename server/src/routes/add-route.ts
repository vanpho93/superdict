import { Request, Response, Express } from 'express'
import { UserContext, IApiRoute, ServerError, handleUnexpectedError, Constants, EEnviroment, getEnvKey } from '../global-refs'
import { defaultTo, isNil } from 'lodash'

export function addRoute(app: Express, { Service, path, middlewares = [], mapper = () => null, method, isPrivateRoute = true }: IApiRoute<{}>) {
  const handler = async (req: Request, res: Response) => {
    const userContext = isPrivateRoute ? await UserContext.getUserContext(req) : null
    try {
      const serviceInstance = new Service(userContext, mapper(req))
      const result = await serviceInstance.process()
      res.send({ success: true, result })
    } catch (error: any) {
      if (isNil(error.statusCode)) handleUnexpectedError(error)
      const statusCode = defaultTo(error.statusCode, 500)
      res.status(statusCode).send({ success: false, message: getErrorMessage(error) })
    }
  }

  const getErrorMessage = (error: ServerError) => {
    if (isNil(error.statusCode) && getEnvKey('NODE_ENV') === EEnviroment.PRODUCTION) return Constants.INTERNAL_SERVER_ERROR
    return error.message
  }

  const getMethod = (methodName: 'GET' | 'POST' | 'DELETE' | 'PUT') => {
    if (methodName === 'GET') return app.get
    if (methodName === 'POST') return app.post
    if (methodName === 'DELETE') return app.delete
    if (methodName === 'PUT') return app.put
    throw new Error('INVALID_METHOD_NAME')
  }
  getMethod(method).bind(app)(`/api${path}`, middlewares, handler)
}
