import { InvalidBodyError, ServerError } from '../../errors'
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
  const sut = new UpdateCurrencyController(currencyValidatorStub, currencyValueValidatorStub, currencyAdapterStub)
  return {
    sut,
    currencyAdapterStub,
    currencyValidatorStub,
    currencyValueValidatorStub
  }
}

describe('UpdateCurrencyController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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
    const isValidSpy = jest.spyOn(currencyValidatorStub, 'isValid')
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
    expect(isValidSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 400 if invalid value is provided', async () => {
    const { sut, currencyValueValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(currencyValueValidatorStub, 'isValid')
    jest.spyOn(currencyValueValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        currency: 'any',
        value: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidBodyError('Valor'))
    expect(isValidSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if throws', async () => {
    const { sut, currencyValidatorStub } = makeSut()
    jest.spyOn(currencyValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        currency: 'any',
        value: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return validators called with correct values', async () => {
    const { sut, currencyValidatorStub, currencyValueValidatorStub } = makeSut()
    const isValidCurrency = jest.spyOn(currencyValidatorStub, 'isValid')
    const isValidValue = jest.spyOn(currencyValueValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        currency: 'any',
        value: 1
      }
    }
    await sut.handle(httpRequest)
    expect(isValidCurrency).toHaveBeenCalledWith(httpRequest.body.currency)
    expect(isValidValue).toHaveBeenCalledWith(httpRequest.body.value)
  })

  test('Should return 500 if updateCurrency fail or return false', async () => {
    const { sut, currencyAdapterStub } = makeSut()
    jest.spyOn(currencyAdapterStub, 'updateCurrency').mockReturnValueOnce(Promise.resolve(false))
    const updateCurrencySpy = jest.spyOn(currencyAdapterStub, 'updateCurrency')
    const httpRequest = {
      body: {
        currency: 'ANY',
        value: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
    expect(updateCurrencySpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if updateCurrency throws', async () => {
    const { sut, currencyAdapterStub } = makeSut()
    jest.spyOn(currencyAdapterStub, 'updateCurrency').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        currency: 'ANY',
        value: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
