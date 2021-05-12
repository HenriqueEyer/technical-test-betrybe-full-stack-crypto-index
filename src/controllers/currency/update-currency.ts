import { badRequest } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../interfaces'
import { InvalidBodyError } from '../../controllers/errors'

export default class UpdateCurrencyController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['currency', 'value']
    const messageError = {
      currency: 'Moeda',
      value: 'Valor'
    }
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new InvalidBodyError(messageError[field]))
      }
    }
  }
}
