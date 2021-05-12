import { TokenService } from '../../interfaces/token'
import { generateToken, isValidToken } from '../../services/token/utils'

export class TokenServiceAdapter implements TokenService {
  generateToken (email?: string, password?: string): string {
    return generateToken()
  }

  async validToken (token: string): Promise<boolean> {
    const isValid = await isValidToken(token)
    return isValid
  }
}
