import LoadCurrencyController from '../../controllers/currency/load-currency'
import express from 'express'
import CurrencyAdapter from '../../adapters/currency/currency'
import UpdateCurrencyController from '../../controllers/currency/update-currency'
import { CurrencyValidatorAdapter } from '../../services/validators/currency-validator'
import { CurrencyValueValidatorAdapter } from '../../services/validators/currency-value-validator'

const router = express.Router()

router.get('/', async (req, res) => {
  const GetCurrency = new CurrencyAdapter()
  const LoadCurrency = new LoadCurrencyController(GetCurrency)
  const { statusCode, body } = await LoadCurrency.handle()
  res.status(statusCode).json(body)
})


router.post('/', async (req, res) => {
  const CurrencyValidator = new CurrencyValidatorAdapter()
  const CurrencyValueValidator = new CurrencyValueValidatorAdapter()
  const Currency = new CurrencyAdapter()
  const UpdateCurrency = new UpdateCurrencyController(CurrencyValidator, CurrencyValueValidator, Currency)
  const { statusCode, body } = await UpdateCurrency.handle(req)
  res.status(statusCode).json(body)
})

export default router
