import validator from 'validator'
import * as utils from './utils'

describe('Utils', () => {
  test('Should Utils.generateToken return a token AlphaNumeric and size of 16', () => {
    const token = utils.generateToken()
    const isAlphanumeric = validator.isAlphanumeric(token)
    expect(token.length).toBe(16)
    expect(isAlphanumeric).toBe(true)
  })
})
