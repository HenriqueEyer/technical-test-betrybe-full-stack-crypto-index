import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator', () => {
  test('Should return false if validator not valid', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_email')
    expect(isValid).toBe(false)
  })
})