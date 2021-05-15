import AuthController from '../../controllers/auth/auth'
import { TokenService } from '../../interfaces/token'

interface SutTypes {
  sut: AuthController
  tokenServiceStub: TokenService
}

const makeSut = (): SutTypes => {
  class TokenServiceStub implements TokenService {
    async generateToken (password: string, email: string): Promise<string> {
      return 'any_token'
    }

    async validToken (token: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  const tokenServiceStub = new TokenServiceStub()
  const sut = new AuthController(tokenServiceStub)
  return {
    sut,
    tokenServiceStub
  }
}

describe('AuthController', () => {
  test('Should return false if not token is provided', async () => {
    const { sut } = makeSut()
    const request = {}
    const isValid = await sut.handle(request)
    expect(isValid).toBe(false)
  })

  test('Should return true if token is valid', async () => {
    const { sut } = makeSut()
    const request = {
      token: 'valid'
    }
    const isValid = await sut.handle(request)
    expect(isValid).toBe(true)
  })

  test('Should return false if token validator return false', async () => {
    const { sut, tokenServiceStub } = makeSut()
    jest.spyOn(tokenServiceStub, 'validToken').mockResolvedValue(Promise.resolve(false))
    const request = {
      token: 'invalid'
    }
    const isValid = await sut.handle(request)
    expect(isValid).toBe(false)
  })

  test('Should return true if token validator return true', async () => {
    const { sut } = makeSut()
    const request = {
      token: 'invalid'
    }
    const isValid = await sut.handle(request)
    expect(isValid).toBe(true)
  })

  test('Should validToken called with correct values', async () => {
    const { sut, tokenServiceStub } = makeSut()
    const validTokenSpy = jest.spyOn(tokenServiceStub, 'validToken')
    const request = {
      token: 'any'
    }
    await sut.handle(request)
    expect(validTokenSpy).toHaveBeenCalledWith(request.token)
  })
})
