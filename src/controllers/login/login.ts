import { HttpRequest, HttpResponse } from '../interfaces/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from 'controllers/interfaces/controller'

export default class LoginController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError())
      }
    }
  }
}
