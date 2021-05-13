import { TokenServiceAdapter } from '../../adapters/token/token'
import LoginController from '../../controllers/login/login'
import { EmailValidatorAdapter } from '../../services/validators/email-validator'
import { PasswordValidatorAdapter } from '../../services/validators/password-validator'
import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  const EmailValidator = new EmailValidatorAdapter()
  const PassWordValidator = new PasswordValidatorAdapter()
  const Token = new TokenServiceAdapter()
  const Login = new LoginController(EmailValidator, PassWordValidator, Token)
  const { statusCode, body } = await Login.handle(req)
  res.status(statusCode).json(body)
})

export default router
