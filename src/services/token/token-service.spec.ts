import { TokenServiceAdapter } from './token-service'
import validator from 'validator'

describe('TokenService', () => {
  test('Should generateToken return a token with size 16', () => {
    const sut = new TokenServiceAdapter()
    const token = sut.generateToken()
    expect(token.length).toBe(16)
  })

  test('Should generateToken return a token just with Alfanumeric', () => {
    const sut = new TokenServiceAdapter()
    const token = sut.generateToken()
    const isAphaNumeric = validator.isAlphanumeric(token)
    expect(isAphaNumeric).toBe(true)
  })

  test('Should generateToken return a token different token with another login was done', () => {
    const sut = new TokenServiceAdapter()
    const token1 = sut.generateToken()
    const token2 = sut.generateToken()
    expect(token1).not.toBe(token2)
  })

  test('Should validToken return true if utils validation return true', () => {
    const sut = new TokenServiceAdapter()
    const token = 'any_token'
    const isValid = sut.validToken(token)
    expect(isValid).toBe(true)
  })
})
