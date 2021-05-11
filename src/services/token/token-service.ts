import { TokenService } from './token-service-interface'
import { generateToken, isValidToken } from './utils'

export class TokenServiceAdapter implements TokenService {
  generateToken (email?: string, password?: string): string {
    return generateToken()
  }

  async validToken (token: string): Promise<boolean> {
    const isValid = await isValidToken(token)
    return isValid
  }
}
