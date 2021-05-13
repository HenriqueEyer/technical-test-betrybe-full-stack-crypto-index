import { Middleware, AuthRequest } from '../../interfaces'

export default class AuthController implements Middleware {
  async handle (request: AuthRequest): Promise<boolean> {
    return false
  }
}
