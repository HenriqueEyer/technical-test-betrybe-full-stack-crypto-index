import { HttpRequest, HttpResponse } from '../interfaces/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'

export default class LoginController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError())
      }
    }
  }
}
