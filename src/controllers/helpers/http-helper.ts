import { bodyCurrencies } from 'controllers/interfaces'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../interfaces/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const successRequestLogin = (token: string): HttpResponse => ({
  statusCode: 200,
  body: {
    token
  }
})

export const successRequestGetCurrency = (data: bodyCurrencies): HttpResponse => ({
  statusCode: 200,
  body: {
    data
  }
})
