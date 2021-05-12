import { PasswordValidator } from '../../interfaces'
import validator from 'validator'

export class PasswordValidatorAdapter implements PasswordValidator {
  isValid (password: string): boolean {
    const isNumber = validator.isNumeric(password)
    const isCorrectSize = password.length === 6
    return isNumber && isCorrectSize
  }
}
