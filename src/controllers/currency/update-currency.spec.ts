import { InvalidBodyError } from '../../controllers/errors'
import { bodyRequestUpdate, UpdateCurrency } from '../../interfaces'
import UpdateCurrencyController from './update-currency'

interface SutTypes {
  sut: UpdateCurrencyController
  currencyAdapterStub: UpdateCurrency
}

const makeSut = (): SutTypes => {
  class CurrencyAdapterStub implements UpdateCurrency {
    async updateCurrency (body: bodyRequestUpdate): Promise<boolean> {
      return true
    }
  }

  const currencyAdapterStub = new CurrencyAdapterStub()
  const sut = new UpdateCurrencyController()
  return {
    sut,
    currencyAdapterStub
  }
}

describe('UpdateCurrencyController', () => {
  test('Should return 400 if no currency is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        value: 10000.0
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidBodyError('Moeda'))
  })

  test('Should return 400 if no valor is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        currency: 'ANY'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidBodyError('Valor'))
  })
})
