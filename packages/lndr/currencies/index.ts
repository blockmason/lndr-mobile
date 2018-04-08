import { NativeModules, Platform } from 'react-native'

let locale = 'en-US'

try {
  if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale
  } else {
    locale = NativeModules.I18nManager.localeIdentifier
  }
} catch (e) {}

const country = locale.slice(3, 5)

export const currencySymbols = {
  AUD: '$',
  CAD: '$',
  CHF: 'CHf',
  CNY: '¥',
  DKK: 'Kr',
  EUR: '€',
  GBP: '£',
  HKD: 'HK$',
  JPY: '¥',
  KRW: '₩',
  NOK: 'kr',
  NZD: '$',
  SEK: 'kr',
  USD: '$'
}

export const transferLimits = {
  AUD: '250',
  CAD: '200',
  CNY: '1600',
  CHF: '250',
  DKK: '1500',
  EUR: '200',
  GBP: '200',
  HKD: '1600',
  JPY: '20000',
  KRW: '200000',
  NOK: '2000',
  NZD: '250',
  SEK: '2000',
  USD: '200'
}

const currencies = {
  AU: 'AUD',
  CA: 'CAD',
  CH: 'CHF',
  CN: 'CNY',
  DE: 'EUR',
  DK: 'DKK',
  ES: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  HK: 'HKD',
  IE: 'EUR',
  IT: 'EUR',
  JP: 'JPY',
  KR: 'KRW',
  NO: 'NOK',
  NZ: 'NZD',
  SE: 'SEK',
  US: 'USD'
}

const getCurrency = (country: string) => {
  return currencies[country] === undefined ? 'EUR' : currencies[country]
}



export const defaultCurrency = getCurrency(country)
