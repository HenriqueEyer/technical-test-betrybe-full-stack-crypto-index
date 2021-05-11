import { HttpRequest, HttpResponse } from '../interfaces/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../interfaces/controller'
import { InvalidParamError } from '../errors/invalid-params-error'
import { EmailValidator } from '../interfaces/email-validator'
import { PasswordValidator } from '../interfaces/password-validator'

export default class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly passwordValidator: PasswordValidator

  constructor (emailValidator: EmailValidator, passwordValidator: PasswordValidator) {
    this.emailValidator = emailValidator
    this.passwordValidator = passwordValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError())
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError())
      }

      const isValidPassword = this.passwordValidator.isValid(httpRequest.body.password)
      if (!isValidPassword) {
        return badRequest(new InvalidParamError())
      }
    } catch (error) {
      return serverError()
    }
  }
}
