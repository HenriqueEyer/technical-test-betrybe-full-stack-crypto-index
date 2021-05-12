import CurrencyAdapter from './currency'
import { promises } from 'fs'
import * as client from '../../services/client/client'

const mockCurrencyValues = `{
  "BRL": "5.400",
  "EUR": "0.5",
  "CAD": "2.000"
}`

const mockData = {
  time: {
    updated: '',
    updatedISO: '',
    updateduk: ''
  },
  disclaimer: '',
  bpi: {
    USD: {
      code: '',
      rate: '',
      description: '',
      rate_float: 1000.00
    },
    BTC: {
      code: '',
      rate: '',
      description: '',
      rate_float: 1
    }
  }
}

const expectValueCAD = {
  code: 'CAD',
  rate: '2.000',
  description: 'Canadian Dollar',
  rate_float: 2000.00
}

const expectValueEUR = {
  code: 'EUR',
  rate: '500',
  description: 'Euro',
  rate_float: 500
}

describe('CurrencyAdapter', () => {
  test('Should getCurrency return expect value', async () => {
    const sut = new CurrencyAdapter()
    jest.spyOn(promises, 'readFile').mockReturnValueOnce(Promise.resolve(mockCurrencyValues))
    jest.spyOn(client, 'getCoin').mockReturnValueOnce(Promise.resolve(mockData))
    const data = await sut.getCurrency()
    expect(data.bpi.CAD).toEqual(expectValueCAD)
    expect(data.bpi.EUR).toEqual(expectValueEUR)
  })
})
