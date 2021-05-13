import request from 'supertest'
import app from '../app'
import * as util from '../../services/token/utils'
import { promises } from 'fs'

describe('Route Login', () => {
  jest.spyOn(util, 'generateToken').mockReturnValueOnce('ANY_TOKEN')
  jest.spyOn(promises, 'writeFile').mockReturnValue(Promise.resolve())

  test('/api/cryto/btc should return 200 and expect body', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    await request(app)
      .get('/api/cryto/btc')
      .set('Authorization', 'validtoken123456')
      .expect(200)
  })

  test('/api/cryto/btc should return 401 if token invalid', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(false))
    await request(app)
      .get('/api/cryto/btc')
      .set('Authorization', 'invalidtoken123456')
      .expect(401)
  })
})
