import AuthController from './auth'

describe('AuthController', () => {
  test('Should return false if not token is provided', async () => {
    const sut = new AuthController()
    const request = {}
    const isValid = await sut.handle(request)
    expect(isValid).toBe(false)
  })
})
