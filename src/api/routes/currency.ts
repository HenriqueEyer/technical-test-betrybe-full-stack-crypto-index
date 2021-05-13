import LoadCurrencyController from '../../controllers/currency/load-currency'
import express from 'express'
import CurrencyAdapter from '../../adapters/currency/currency'

const router = express.Router()

router.get('/', async (req, res) => {
  const GetCurrency = new CurrencyAdapter()
  const LoadCurrency = new LoadCurrencyController(GetCurrency)
  const { statusCode, body } = await LoadCurrency.handle()
  res.status(statusCode).json(body)
})

export default router
