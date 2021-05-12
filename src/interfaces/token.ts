export interface TokenService {
  generateToken: (email: string, password: string) => string
  validToken: (token: string) => Promise<boolean>
}

export interface FileToken {
  tokens: string[]
}
