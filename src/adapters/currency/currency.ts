import { GetCurrency, bodyCurrencies } from '../../interfaces'
// import { } from '../../services/client'

export default class CurrencyAdapter implements GetCurrency {
  async getCurrency (): Promise<bodyCurrencies> {
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
    return data
  }
}
