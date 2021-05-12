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
})
