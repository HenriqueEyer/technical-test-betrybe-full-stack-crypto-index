import Auth from './middleware/auth'
import express from 'express'
import Login from './routes/login'
import currency from './routes/currency'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/login', Login)

app.use(Auth)

app.use('/api/cryto/btc', currency)

export default app
