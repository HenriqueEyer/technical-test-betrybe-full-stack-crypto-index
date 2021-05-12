import { InvalidBodyError } from '../../controllers/errors'
import { bodyRequestUpdate, CurrencyValidator, UpdateCurrency, CurrencyValueValidator } from '../../interfaces'
import UpdateCurrencyController from './update-currency'

interface SutTypes {
  sut: UpdateCurrencyController
  currencyAdapterStub: UpdateCurrency
  currencyValidatorStub: CurrencyValidator
  currencyValueValidatorStub: CurrencyValueValidator
}

const makeSut = (): SutTypes => {
  class CurrencyValueValidatorStub implements CurrencyValueValidator {
    isValid (value: number): boolean {
      return true
    }
  }

  class CurrencyValidatorStub implements CurrencyValidator {
    isValid (currency: string): boolean {
      return true
    }
  }

  class CurrencyAdapterStub implements UpdateCurrency {
    async updateCurrency (body: bodyRequestUpdate): Promise<boolean> {
      return true
    }
  }

  const currencyAdapterStub = new CurrencyAdapterStub()
  const currencyValidatorStub = new CurrencyValidatorStub()
  const currencyValueValidatorStub = new CurrencyValueValidatorStub()
  const sut = new UpdateCurrencyController(currencyValidatorStub, currencyValueValidatorStub)
  return {
    sut,
    currencyAdapterStub,
    currencyValidatorStub,
    currencyValueValidatorStub
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

  test('Should return 400 if invalid currency is provided', async () => {
    const { sut, currencyValidatorStub } = makeSut()
    jest.spyOn(currencyValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        currency: 'Invalid',
        value: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidBodyError('Moeda'))
  })

  test('Should return 400 if invalid value is provided', async () => {
    const { sut, currencyValueValidatorStub } = makeSut()
    jest.spyOn(currencyValueValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        currency: 'any',
        value: 0
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidBodyError('Valor'))
  })
})
