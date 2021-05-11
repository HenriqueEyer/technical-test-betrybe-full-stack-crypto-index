import { PasswordValidatorAdapter } from './password-validator'
import validator from 'validator'

describe('EmailValidator', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should return false if validator not valid', () => {
    const sut = new PasswordValidatorAdapter()
    jest.spyOn(validator, 'isNumeric').mockReturnValueOnce(false)
    const isValid = sut.isValid('123456')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator is valid', () => {
    const sut = new PasswordValidatorAdapter()
    jest.spyOn(validator, 'isNumeric').mockReturnValueOnce(true)
    const isValid = sut.isValid('123456')
    expect(isValid).toBe(true)
  })

  test('Should Validator isNumeric Call correct values', () => {
    const sut = new PasswordValidatorAdapter()
    const isNumericSpy = jest.spyOn(validator, 'isNumeric')
    const password = '123456'
    sut.isValid(password)
    expect(isNumericSpy).toHaveBeenCalledWith(password)
  })

  test('Should return false if password lenght different than 6 number', () => {
    const sut = new PasswordValidatorAdapter()
    const isValid = sut.isValid('1234567')
    expect(isValid).toBe(false)
  })

  test('Should return true if password lenght equal 6 number', () => {
    const sut = new PasswordValidatorAdapter()
    const isValid = sut.isValid('123456')
    expect(isValid).toBe(true)
  })
})
