import { TokenService } from '../../interfaces/token'
import { Middleware, AuthRequest } from '../../interfaces'

export default class AuthController implements Middleware {
  private readonly tokenService: TokenService

  constructor (tokenService: TokenService) {
    this.tokenService = tokenService
  }

  async handle (request: AuthRequest): Promise<boolean> {
    if (!request.token) {
      return false
    }
    const isValid = await this.tokenService.validToken(request.token)
    if (!isValid) {
      return false
    }
    return true
  }
}
