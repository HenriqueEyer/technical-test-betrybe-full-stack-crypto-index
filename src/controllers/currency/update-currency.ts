import { badRequest } from '../helpers/http-helper'
import { Controller, CurrencyValidator, HttpRequest, HttpResponse } from '../../interfaces'
import { InvalidBodyError } from '../../controllers/errors'

export default class UpdateCurrencyController implements Controller {
  private readonly currencyValidator: CurrencyValidator

  constructor (currencyValidator: CurrencyValidator) {
    this.currencyValidator = currencyValidator
  }

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
    const { currency } = httpRequest.body
    const currencyIsValid = this.currencyValidator.isValid(currency)
    if (!currencyIsValid) {
      return badRequest(new InvalidBodyError('Moeda'))
    }
  }
}
