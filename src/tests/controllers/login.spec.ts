import LoginController from '../../controllers/login/login'
import { EmailValidator, PasswordValidator } from '../../interfaces'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { TokenService } from '../../interfaces/token'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  passwordValidatorStub: PasswordValidator
  tokenServiceStub: TokenService
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  class PasswordValidatorStub implements PasswordValidator {
    isValid (password: string): boolean {
      return true
    }
  }

  class TokenServiceStub implements TokenService {
    async generateToken (password: string, email: string): Promise<string> {
      return 'any_token'
    }

    async validToken (token: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  const tokenServiceStub = new TokenServiceStub()
  const emailValidatorStub = new EmailValidatorStub()
  const passwordValidatorStub = new PasswordValidatorStub()
  const sut = new LoginController(emailValidatorStub, passwordValidatorStub, tokenServiceStub)
  return {
    sut,
    emailValidatorStub,
    tokenServiceStub,
    passwordValidatorStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new MissingParamError().message })
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new MissingParamError().message })
  })

  test('Should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new InvalidParamError().message })
  })

  test('Should return 400 if invalid password is provided', async () => {
    const { sut, passwordValidatorStub } = makeSut()
    jest.spyOn(passwordValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ message: new InvalidParamError().message })
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({ message: new ServerError().message })
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, passwordValidatorStub } = makeSut()
    jest.spyOn(passwordValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({ message: new ServerError().message })
  })

  test('Should Call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should Call PasswordValidator with correct password', async () => {
    const { sut, passwordValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(passwordValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.password)
  })

  test('Should Call GenerateToken with correct values', async () => {
    const { sut, tokenServiceStub } = makeSut()
    const generateTokenSpy = jest.spyOn(tokenServiceStub, 'generateToken')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const { email, password } = httpRequest.body
    await sut.handle(httpRequest)
    expect(generateTokenSpy).toHaveBeenCalledWith(email, password)
  })

  test('Should return 500 if TokenService throws', async () => {
    const { sut, tokenServiceStub } = makeSut()
    jest.spyOn(tokenServiceStub, 'generateToken').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({ message: new ServerError().message })
  })

  test('Should return 200 if generateToken Success and return a token', async () => {
    const { sut, tokenServiceStub } = makeSut()
    const mockToken = 'any_token'
    jest.spyOn(tokenServiceStub, 'generateToken').mockReturnValueOnce(Promise.resolve(mockToken))
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.token).toEqual(mockToken)
  })
})
