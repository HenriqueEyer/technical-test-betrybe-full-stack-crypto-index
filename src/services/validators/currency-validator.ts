import { CurrencyValidator } from '../../interfaces'

export class CurrencyValidatorAdapter implements CurrencyValidator {
  isValid (currency: string): boolean {
    return true
  }
}
