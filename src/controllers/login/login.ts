import { HttpRequest, HttpResponse } from '../interfaces/http'
import { MissingParamError } from '../errors/missing-params-error'

export default class LoginController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const httpResponse = {
      statusCode: 400,
      body: new Error()
    }

    if (!httpRequest.body.email) {
      httpResponse.body = new MissingParamError('email')
    }

    if (!httpRequest.body.password) {
      httpResponse.body = new MissingParamError('password')
    }

    return httpResponse
  }
}
