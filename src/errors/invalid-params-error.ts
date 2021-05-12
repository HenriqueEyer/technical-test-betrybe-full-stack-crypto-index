export class InvalidParamError extends Error {
  constructor () {
    super('Campos inválidos')
    this.name = 'InvalidParamError'
  }
}
