import { country } from 'language'

const currencies = {
  DK: 'DKK',
  CH: 'CHF',
  DE: 'EUR',
  ES: 'EUR',
  IE: 'EUR',
  AU: 'AUD',
  GB: 'GBP',
  CA: 'CAD',
  JP: 'JPY',
  KR: 'KRW',
  NO: 'NOK',
  FR: 'EUR',
  SE: 'SEK',
  IT: 'EUR',
  US: 'USD'
}

const getCurrency = (country: string) => {
  return currencies[country] === undefined ? 'EUR' : currencies[country]
}

export const defaultCurrency = getCurrency(country)
