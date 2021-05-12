import { successRequestGetCurrency } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../interfaces'

export default class LoadCurrencyController implements Controller {
  handle (httpRequest?: HttpRequest): HttpResponse {
    const currency = {
      code: '',
      rate: '',
      description: '',
      rate_float: 1
    }
    const data = {
      time: {
        updated: '',
        updatedISO: '',
        updateduk: ''
      },
      disclaimer: '',
      bpi: {
        USD: currency,
        BTC: currency,
        BRL: currency,
        EUR: currency,
        CAD: currency
      }
    }
    return successRequestGetCurrency(data)
  }
}
