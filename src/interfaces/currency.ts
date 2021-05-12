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
