import request from 'supertest'
import app from '../../api/app'

describe('App', () => {
  test('should return 404 and message if not found a endpoint valid', async () => {
    const res = await request(app)
      .post('/invalid/')
      .expect(404)
    expect(res.body).toEqual({ message: 'Endpoint não encontrado' })
  })
})
