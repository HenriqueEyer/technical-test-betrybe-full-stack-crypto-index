export class InvalidBodyError extends Error {
  constructor (param: string) {
    super(`${param} ${param === 'Moeda' ? 'inválida' : 'inválido'}`)
    this.name = 'InvalidBodyError'
  }
}
