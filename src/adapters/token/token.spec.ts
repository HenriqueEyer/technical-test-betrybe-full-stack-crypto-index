import { TokenServiceAdapter } from './token'
import validator from 'validator'
import * as utils from '../../services/token/utils'

describe('TokenService', () => {
  test('Should generateToken return a token with size 16', () => {
    const sut = new TokenServiceAdapter()
    const token = sut.generateToken()
    expect(token.length).toBe(16)
  })

  test('Should generateToken return a token just with Alphanumeric', () => {
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

  test('Should validToken return true if utils validation return true', async () => {
    const sut = new TokenServiceAdapter()
    jest.spyOn(utils, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    const token = 'any_token'
    const isValid = await sut.validToken(token)
    expect(isValid).toBe(true)
  })

  test('Should validToken return false if utils validation return false', async () => {
    const sut = new TokenServiceAdapter()
    jest.spyOn(utils, 'isValidToken').mockReturnValueOnce(Promise.resolve(false))
    const token = 'any_token'
    const isValid = await sut.validToken(token)
    expect(isValid).toBe(false)
  })
})
