import { TokenServiceAdapter } from '../../adapters/token/token'
import validator from 'validator'
import * as utils from '../../services/token/utils'
import { promises } from 'fs'

describe('TokenServiceAdapter', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should generateToken return a token with size 16', async () => {
    const sut = new TokenServiceAdapter()
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())
    const token = await sut.generateToken()
    expect(token.length).toBe(16)
  })

  test('Should generateToken return a token just with Alphanumeric', async () => {
    const sut = new TokenServiceAdapter()
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())
    const token = await sut.generateToken()
    const isAphaNumeric = validator.isAlphanumeric(token)
    expect(isAphaNumeric).toBe(true)
  })

  test('Should generateToken return a token different token with another login was done', async () => {
    const sut = new TokenServiceAdapter()
    jest.spyOn(promises, 'writeFile').mockReturnValue(Promise.resolve())
    const token1 = await sut.generateToken()
    const token2 = await sut.generateToken()
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
