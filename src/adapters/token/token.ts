import { TokenService } from '../../interfaces/token'
import { generateToken, isValidToken, saveToken } from '../../services/token/utils'

export class TokenServiceAdapter implements TokenService {
  async generateToken (email?: string, password?: string): Promise<string> {
    const token = generateToken()
    await saveToken(token)
    return token
  }

  async validToken (token: string): Promise<boolean> {
    const isValid = await isValidToken(token)
    return isValid
  }
}
