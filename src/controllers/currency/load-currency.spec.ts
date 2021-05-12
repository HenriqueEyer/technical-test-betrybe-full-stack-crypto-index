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
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should return 200 and a body with correct values', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.data).toEqual(mockData)
  })

  test('Should call getCurrency one time', async () => {
    const { sut, currencyAdapterStub } = makeSut()
    const getCurrencySpy = jest.spyOn(currencyAdapterStub, 'getCurrency')
    await sut.handle()
    expect(getCurrencySpy).toBeCalledTimes(1)
  })

  test('Should return 500 if currencyAdapterStub throws', async () => {
    const { sut, currencyAdapterStub } = makeSut()
    jest.spyOn(currencyAdapterStub, 'getCurrency').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
  })
})
