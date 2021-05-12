import { GetCurrency, bodyCurrencies } from '../../interfaces'
import { getCoin } from '../../services/client/client'
import { getCurrencies } from '../../services/currency/utils'

export default class CurrencyAdapter implements GetCurrency {
  async getCurrency (): Promise<bodyCurrencies> {
    const data = await getCoin()
    const currencies = await getCurrencies()
    const { rate_float: rateFloat } = data.bpi.USD
    const description = {
      BRL: 'Brazilian Real',
      EUR: 'Euro',
      CAD: 'Canadian Dollar'
    }
    Object.keys(description).forEach((currency) => {
      const value = currencies[currency] * rateFloat
      data.bpi[currency] = {
        code: currency,
        rate: `${value.toLocaleString('pt-BR')}`,
        description: description[currency],
        rate_float: value
      }
    })
    return data
  }
}
