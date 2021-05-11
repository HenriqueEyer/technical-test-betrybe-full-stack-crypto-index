export interface TokenService {
  generateToken: (email: string, password: string) => string
}
