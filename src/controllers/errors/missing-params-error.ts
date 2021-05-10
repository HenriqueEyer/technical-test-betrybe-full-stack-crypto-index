export class MissingParamError extends Error {
  constructor () {
    super('Campos inválidos')
    this.name = 'MissingParamError'
  }
}
