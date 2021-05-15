import request from 'supertest'
import app from '../../api/app'
import * as util from '../../services/token/utils'
import { promises } from 'fs'
import { InvalidParamError } from '../../errors'

describe('Route Login', () => {
  jest.spyOn(util, 'generateToken').mockReturnValueOnce('ANY_TOKEN')
  jest.spyOn(promises, 'writeFile').mockReturnValue(Promise.resolve())

  test('Login Should return 200 and a token if receive is invalid', async () => {
    const login = { email: 'valid@valid.com', password: '123456' }
    const res = await request(app)
      .post('/api/login/')
      .send(login)
      .expect(200)
    expect(res.body).toEqual({ token: 'ANY_TOKEN' })
  })

  test('Login should return 400 and message if password is invalid', async () => {
    const login = { email: 'valid@valid.com', password: '1234567' }
    const res = await request(app)
      .post('/api/login')
      .send(login)
      .expect(400)
    expect(res.body).toEqual({ message: new InvalidParamError().message })
  })

  test('Login should return 400 and message if email is invalid', async () => {
    const login = { email: 'invalid', password: '123456' }
    const res = await request(app)
      .post('/api/login')
      .send(login)
      .expect(400)
    expect(res.body).toEqual({ message: new InvalidParamError().message })
  })
})
