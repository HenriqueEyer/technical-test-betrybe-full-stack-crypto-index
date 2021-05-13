import request from 'supertest'
import { app } from '../../api'
import * as util from '../../services/token/utils'
import { promises } from 'fs'

describe('Route Login', () => {
  const login = { email: 'valid@valid.com', password: '123456' }
  test('Login', async () => {
    jest.spyOn(util, 'generateToken').mockReturnValueOnce('ANY_TOKEN')
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())
    const res = await request(app)
      .post('/api/login/')
      .send(login)
      .expect(200)
    expect(res.body).toEqual({ token: 'ANY_TOKEN' })
  })
})
