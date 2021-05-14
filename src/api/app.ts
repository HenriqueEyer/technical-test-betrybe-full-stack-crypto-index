import express from 'express'
import Login from './routes/login'
import currency from './routes/currency'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/login', Login)

app.use('/api/crypto/btc', currency)

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint não encontrado'
  })
})

export default app
