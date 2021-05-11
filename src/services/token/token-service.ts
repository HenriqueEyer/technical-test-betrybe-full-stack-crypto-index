import { TokenService } from './token-service-interface'
import { generateToken } from './utils'

export class TokenServiceAdapter implements TokenService {
  generateToken (email?: string, password?: string): string {
    return generateToken()
  }

  validToken (token: string): boolean {
    return true
  }
}
