import { GetCurrency, bodyCurrencies, UpdateCurrency, bodyRequestUpdate } from '../../interfaces'
import { getCoin } from '../../services/client/client'
import { getCurrencies, updateCurrencies } from '../../services/currency/utils'

export default class CurrencyAdapter implements GetCurrency, UpdateCurrency {
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

  async updateCurrency (body: bodyRequestUpdate): Promise<boolean> {
    const currencies = await getCurrencies()
    const { currency, value } = body
    currencies[currency] = value
    const isSuccess = await updateCurrencies(currencies)
    return isSuccess
  }
}
