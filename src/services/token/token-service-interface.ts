export interface TokenService {
  generateToken: (email: string, password: string) => string
  validToken: (token: string) => boolean
}
