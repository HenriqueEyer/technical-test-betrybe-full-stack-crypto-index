import { CurrencyValidatorAdapter } from './currency-validator'

describe('CurrencyValidator', () => {
  test('should return true if currency is valid', () => {
    const sut = new CurrencyValidatorAdapter()
    const currency = 'CAD'
    const isValid = sut.isValid(currency)
    expect(isValid).toBe(true)
  })
})
