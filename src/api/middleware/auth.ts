import { TokenServiceAdapter } from '../../adapters/token/token'
import AuthController from '../../controllers/auth/auth'

const authenticationMiddleware = async (req, res, next): Promise<void> => {
  const TokenService = new TokenServiceAdapter()
  const Auth = new AuthController(TokenService)
  const isValid = await Auth.handle({ token: req.headers.authorization })
  if (!isValid) {
    return res.status(401).json({ message: 'Token inválido' })
  }
  next()
}

export default authenticationMiddleware
