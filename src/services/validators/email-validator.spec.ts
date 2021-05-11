import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

describe('EmailValidator', () => {
  test('Should return false if validator not valid', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator is valid', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_email')
    expect(isValid).toBe(true)
  })
})
