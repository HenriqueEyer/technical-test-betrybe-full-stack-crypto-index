import { CurrencyValueValidator } from '../../interfaces'

export class CurrencyValueValidatorAdapter implements CurrencyValueValidator {
  isValid (value: number): boolean {
    const isValueValid = value > 0 && Number.isInteger(value)
    return isValueValid
  }
}
