import { CurrencyValidator } from '../../interfaces'

export class CurrencyValidatorAdapter implements CurrencyValidator {
  isValid (currency: string): boolean {
    const currencyValid = ['CAD', 'BRL', 'EUR']
    return currencyValid.includes(currency)
  }
}
