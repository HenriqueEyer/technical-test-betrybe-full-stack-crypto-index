import { badRequest } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../interfaces'
import { InvalidBodyError } from '../../controllers/errors'

export default class UpdateCurrencyController implements Controller {
  async handle (httpRequest?: HttpRequest): Promise<HttpResponse> {
    return badRequest(new InvalidBodyError('Moeda'))
  }
}
