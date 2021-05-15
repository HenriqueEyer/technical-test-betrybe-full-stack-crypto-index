import { CurrencyValidatorAdapter } from '../../services/validators/currency-validator'

describe('CurrencyValidator', () => {
  test('should return true if currency is valid', () => {
    const sut = new CurrencyValidatorAdapter()
    const currency = 'CAD'
    const isValid = sut.isValid(currency)
    expect(isValid).toBe(true)
  })

  test('should return true if currency is invalid', () => {
    const sut = new CurrencyValidatorAdapter()
    const currency = 'Invalid'
    const isValid = sut.isValid(currency)
    expect(isValid).toBe(false)
  })
})
