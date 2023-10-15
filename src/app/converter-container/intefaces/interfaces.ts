export interface IConversionRates {
  base_code: string
  conversion_rates: object
  documentation: string
  result: string
  terms_of_use: string
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
}

export interface ICurrencies {
  currencies: {
    [currencyCode: string]: {
      name: string
      symbol: string
    }
  }
}

export interface ICustomData {
  currency: string
  name: string
  price: number
  symbol: string
}

