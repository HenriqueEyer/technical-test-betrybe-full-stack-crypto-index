import { CurrencyValueValidatorAdapter } from './currency-value-validator'

describe('CurrencyValueValidator', () => {
  test('should return true if value is valid', () => {
    const sut = new CurrencyValueValidatorAdapter()
    const value = 10
    const isValid = sut.isValid(value)
    expect(isValid).toBe(true)
  })
})
