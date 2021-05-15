import request from 'supertest'
import app from '../../api/app'
import * as util from '../../services/token/utils'
import { promises } from 'fs'

describe('Route Login', () => {
  test('get to /api/crypto/btc should return 200 and expect body', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    await request(app)
      .get('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .expect(200)
  })

  test('get to /api/crypto/btc should return 401 if token invalid', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(false))
    await request(app)
      .get('/api/crypto/btc')
      .set('Authorization', 'invalidtoken123456')
      .expect(401)
  })

  test('get to /api/crypto/btc should return 401 if not send token', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(false))
    await request(app)
      .get('/api/crypto/btc')
      .expect(401)
  })

  test('get to /api/crypto/btc should return 401 and correct message', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    const httpResponse = await request(app)
      .get('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .expect(401)
    expect(httpResponse.body).toEqual({ message: 'Token inválido' })
  })

  test('Post to /api/crypto/btc should return 200 if a body valid is provided', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())

    const body = {
      currency: 'CAD',
      value: 10
    }

    const httpResponse = await request(app)
      .post('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .send(body)
      .expect(200)
    expect(httpResponse.body).toEqual({ message: 'Valor alterado com sucesso!' })
  })

  test('Post to /api/crypto/btc should return 400 and correct message if value invalid is provided', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())

    const body = {
      currency: 'CAD',
      value: 10.3
    }

    const httpResponse = await request(app)
      .post('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .send(body)
      .expect(400)
    expect(httpResponse.body).toEqual({ message: 'Valor inválido' })
  })

  test('Post to /api/crypto/btc should return 400 and correct message if value is not provided', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())

    const body = {
      currency: 'CAD'
    }

    const httpResponse = await request(app)
      .post('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .send(body)
      .expect(400)
    expect(httpResponse.body).toEqual({ message: 'Valor inválido' })
  })

  test('Post to /api/crypto/btc should return 400 and correct message if currency invalid is provided', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())

    const body = {
      currency: 'CA',
      value: 10
    }

    const httpResponse = await request(app)
      .post('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .send(body)
      .expect(400)
    expect(httpResponse.body).toEqual({ message: 'Moeda inválida' })
  })

  test('Post to /api/crypto/btc should return 400 and correct message if currency is not provided', async () => {
    jest.spyOn(util, 'isValidToken').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(promises, 'writeFile').mockReturnValueOnce(Promise.resolve())

    const body = {
      value: 10
    }

    const httpResponse = await request(app)
      .post('/api/crypto/btc')
      .set('Authorization', 'validtoken123456')
      .send(body)
      .expect(400)
    expect(httpResponse.body).toEqual({ message: 'Moeda inválida' })
  })
})
