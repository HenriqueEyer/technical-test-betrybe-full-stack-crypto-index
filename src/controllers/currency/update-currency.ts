import { badRequest, serverError, successRequestUpdateCurrency } from '../helpers/http-helper'
import { Controller, CurrencyValidator, CurrencyValueValidator, HttpRequest, HttpResponse, UpdateCurrency } from '../../interfaces'
import { InvalidBodyError } from '../../errors'

export default class UpdateCurrencyController implements Controller {
  private readonly currencyValidator: CurrencyValidator
  private readonly currencyValueValidator: CurrencyValueValidator
  private readonly currency: UpdateCurrency

  constructor (currencyValidator: CurrencyValidator, currencyValueValidator: CurrencyValueValidator, currency: UpdateCurrency) {
    this.currencyValidator = currencyValidator
    this.currencyValueValidator = currencyValueValidator
    this.currency = currency
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      const { currency, value } = httpRequest.body
      const currencyIsValid = this.currencyValidator.isValid(currency)
      if (!currencyIsValid) {
        return badRequest(new InvalidBodyError('Moeda'))
      }

      const isCurrencyValueValid = this.currencyValueValidator.isValid(value)
      if (!isCurrencyValueValid) {
        return badRequest(new InvalidBodyError('Valor'))
      }

      const isSuccess = await this.currency.updateCurrency(httpRequest.body)
      if (!isSuccess) {
        return serverError()
      }
      return successRequestUpdateCurrency()
    } catch (error) {
      return serverError()
    }
  }
}
