import validator from 'validator'
import * as utils from './utils'
import { promises } from 'fs'

describe('Utils', () => {
  test('Should Utils.generateToken return a token AlphaNumeric and size of 16', () => {
    const token = utils.generateToken()
    const isAlphanumeric = validator.isAlphanumeric(token)
    expect(token.length).toBe(16)
    expect(isAlphanumeric).toBe(true)
  })

  test('Should Utils.getTokens return a array of tokens', async () => {
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token", "any_token2"]}'))
    const { tokens } = await utils.getTokens()
    expect(tokens[0]).toBe('any_token')
    expect(tokens[1]).toBe('any_token2')
  })

  test('Should Utils.validToken return true if pass a valid token', async () => {
    const token = 'valid_token12345'
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token", "valid_token12345"]}'))
    jest.spyOn(validator, 'isAlphanumeric').mockReturnValueOnce(true)
    const isValid = await utils.isValidToken(token)
    expect(isValid).toBe(true)
  })

  test('Should Utils.validToken return false if pass a token with size lesser not equal 16', async () => {
    const token = 'invalid_token12345'
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token", "invalid_token12345"]}'))
    jest.spyOn(validator, 'isAlphanumeric').mockReturnValueOnce(true)
    const isValid = await utils.isValidToken(token)
    expect(isValid).toBe(false)
  })

  test('Should Utils.validToken return false if validator return false', async () => {
    const token = 'valid_token12345'
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token", "valid_token12345"]}'))
    jest.spyOn(validator, 'isAlphanumeric').mockReturnValueOnce(false)
    const isValid = await utils.isValidToken(token)
    expect(isValid).toBe(false)
  })

  test('Should Utils.validToken return false if not a generate token', async () => {
    const token = 'valid_token12345'
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token"]}'))
    jest.spyOn(validator, 'isAlphanumeric').mockReturnValueOnce(true)
    const isValid = await utils.isValidToken(token)
    expect(isValid).toBe(false)
  })

  test('Should Utils.saveToken return true with success on save token', async () => {
    const token = 'valid_token12345'
    jest.spyOn(promises, 'writeFile').mockImplementationOnce(async () => Promise.resolve())
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token"]}'))
    jest.spyOn(validator, 'isAlphanumeric').mockReturnValueOnce(true)
    const isValid = await utils.saveToken(token)
    expect(isValid).toBe(true)
  })

  test('Should Utils.saveToken return false with not success on save token', async () => {
    const token = 'valid_token12345'
    jest.spyOn(promises, 'writeFile').mockImplementationOnce(async () => {
      throw new Error()
    })
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve('{ "tokens": ["any_token"]}'))
    jest.spyOn(validator, 'isAlphanumeric').mockReturnValueOnce(true)
    const isValid = await utils.saveToken(token)
    expect(isValid).toBe(false)
  })
})
