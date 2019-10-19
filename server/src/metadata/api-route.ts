import { RequestHandler, Request } from 'express'
import { IUserContext } from './user-context'
import { ApiService } from './api-service'

type ClassOfApiService<Input> = { new (userContext: IUserContext, input: Input): ApiService<unknown, unknown>; }

export interface IApiRoute<Input> {
  Service: ClassOfApiService<Input>
  path: string
  middlewares?: RequestHandler[]
  mapper?: (req: Request) => Input
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  isPrivateRoute?: boolean
}
