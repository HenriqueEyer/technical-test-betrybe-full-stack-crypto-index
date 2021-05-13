import { AuthRequest } from './auth-request'
import { HttpResponse } from './http'

export interface Middleware {
  handle: (request: AuthRequest) => Promise<HttpResponse | boolean>
}
