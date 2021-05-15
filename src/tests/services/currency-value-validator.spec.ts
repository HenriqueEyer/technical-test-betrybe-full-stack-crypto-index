import { CurrencyValueValidatorAdapter } from '../../services/validators/currency-value-validator'

describe('CurrencyValueValidator', () => {
  test('should return true if value is valid', () => {
    const sut = new CurrencyValueValidatorAdapter()
    const value = 10
    const isValid = sut.isValid(value)
    expect(isValid).toBe(true)
  })

  test('should return false if value is equal or lesser than 0', () => {
    const sut = new CurrencyValueValidatorAdapter()
    const value = 0
    const isValid = sut.isValid(value)
    expect(isValid).toBe(false)
  })

  test('should return false if value is not integer', () => {
    const sut = new CurrencyValueValidatorAdapter()
    const value = 2.6
    const isValid = sut.isValid(value)
    expect(isValid).toBe(false)
  })
})
