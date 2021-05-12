import { GetCurrency, bodyCurrencies } from '../../interfaces'
import LoadCurrencyController from './load-currency'

const mockCurrency = {
  code: '',
  rate: '',
  description: '',
  rate_float: 1
}
const mockData = {
  time: {
    updated: '',
    updatedISO: '',
    updateduk: ''
  },
  disclaimer: '',
  bpi: {
    USD: mockCurrency,
    BTC: mockCurrency,
    BRL: mockCurrency,
    EUR: mockCurrency,
    CAD: mockCurrency
  }
}

interface SutTypes {
  sut: LoadCurrencyController
  currencyAdapterStub: GetCurrency
}

const makeSut = (): SutTypes => {
  class CurrencyAdapterStub implements GetCurrency {
    async getCurrency (): Promise<bodyCurrencies> {
      return mockData
    }
  }

  const currencyAdapterStub = new CurrencyAdapterStub()
  const sut = new LoadCurrencyController(currencyAdapterStub)
  return {
    sut,
    currencyAdapterStub
  }
}

describe('LoadCurrencyController', () => {
  test('Should return 200 and a body with correct values', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
  })
})
