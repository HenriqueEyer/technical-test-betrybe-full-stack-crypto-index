import LoadCurrencyController from './load-currency'

describe('LoadCurrencyController', () => {
  test('Should return 200 and a body with correct values', () => {
    const sut = new LoadCurrencyController()
    const httpResponse = sut.handle()
    expect(httpResponse.statusCode).toBe(200)
  })
})
