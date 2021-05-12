export class InvalidBodyError extends Error {
  constructor (param: string) {
    super(`${param} inválida`)
    this.name = 'InvalidBodyError'
  }
}
