import { TokenService } from './token-service-interface'

export class TokenServiceAdapter implements TokenService {
  generateToken (email: string, password: string): string {
    return '123456789AbcdeFG'
  }

  validToken: (token: string) => string
}
