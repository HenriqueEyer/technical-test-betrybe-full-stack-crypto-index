import { bodyCurrencies } from '../../interfaces'
import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../interfaces/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      message: error.message
    }
  }
}

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    message: new ServerError().message
  }
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

export const successRequestUpdateCurrency = (): HttpResponse => ({
  statusCode: 200,
  body: {
    message: 'Valor alterado com sucesso!'
  }
})
