export interface bodyCurrencies {
  time: {
    updated: string
    updatedISO: string
    updateduk: string
  }
  disclaimer: string
  bpi: {
    USD: bodyCurrency
    BTC: bodyCurrency
    BRL: bodyCurrency
    EUR: bodyCurrency
    CAD: bodyCurrency
  }
}

export interface bodyCurrency {
  code: string
  rate: string
  description: string
  rate_float: number
}

export interface GetCurrency {
  getCurrency: () => Promise<bodyCurrencies>
}

export interface bodyRequestUpdate {
  currency: string
  value: number
}

export interface UpdateCurrency {
  updateCurrency: (body: bodyRequestUpdate) => Promise<boolean>
}

export interface CurrencyValidator {
  isValid: (currency: string) => boolean
}
