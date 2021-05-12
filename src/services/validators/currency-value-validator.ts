import { CurrencyValueValidator } from '../../interfaces'

export class CurrencyValueValidatorAdapter implements CurrencyValueValidator {
  isValid (value: number): boolean {
    return true
  }
}
