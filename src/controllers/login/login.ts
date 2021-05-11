import { badRequest, serverError, successRequest } from '../helpers/http-helper'
import { EmailValidator, PasswordValidator, Controller, HttpRequest, HttpResponse } from '../interfaces'
import { MissingParamError, InvalidParamError } from '../errors'
import { TokenService } from '../../services/token/token-service-interface'

export default class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly passwordValidator: PasswordValidator
  private readonly tokenService: TokenService

  constructor (emailValidator: EmailValidator, passwordValidator: PasswordValidator, tokenService: TokenService) {
    this.emailValidator = emailValidator
    this.passwordValidator = passwordValidator
    this.tokenService = tokenService
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError())
        }
      }
      const { email, password } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError())
      }

      const isValidPassword = this.passwordValidator.isValid(password)
      if (!isValidPassword) {
        return badRequest(new InvalidParamError())
      }

      const token = this.tokenService.generateToken(email, password)
      return successRequest(token)
    } catch (error) {
      return serverError()
    }
  }
}
