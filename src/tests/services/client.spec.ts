import { getCoin } from '../../services/client/client'
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchMock = require('node-fetch')

describe('ClientService', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  test('Should return value expect', async () => {
    fetchMock.mock('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', {
      body: {
        time: {
          updated: 'Mar 22, 2020 23:54:00 UTC',
          updatedISO: '2020-03-22T23:54:00+00:00',
          updateduk: 'Mar 22, 2020 at 23:54 GMT'
        },
        disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
        bpi: {
          USD: {
            code: 'USD',
            rate: '6,506.6717',
            description: 'United States Dollar',
            rate_float: 6506.6717
          },
          BTC: {
            code: 'BTC',
            rate: '1.0000',
            description: 'Bitcoin',
            rate_float: 1
          }
        }
      },
      status: 200
    })

    const data = await getCoin()
    expect(data.time).toEqual({
      updated: 'Mar 22, 2020 23:54:00 UTC',
      updatedISO: '2020-03-22T23:54:00+00:00',
      updateduk: 'Mar 22, 2020 at 23:54 GMT'
    })
  })

  test('Should return a error if request fail', async () => {
    fetchMock.mock('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', 500)
    const data = await getCoin()
    expect(data).toEqual(new Error('Falha na requisição'))
  })
})
