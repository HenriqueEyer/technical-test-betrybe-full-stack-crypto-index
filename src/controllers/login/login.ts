import { HttpRequest, HttpResponse } from '../interfaces/http'

export default class LoginController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const httpResponse = {
      statusCode: 400,
      body: new Error()
    }

    if (!httpRequest.body.email) {
      httpResponse.body = new Error('Missing param: email')
    }

    if (!httpRequest.body.password) {
      httpResponse.body = new Error('Missing param: password')
    }

    return httpResponse
  }
}
