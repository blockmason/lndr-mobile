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

export const currencySymbols = (currency) => {
  const symbols = {
    AUD: 'AU$',
    CAD: 'CA$',
    CHF: 'CHf',
    CNY: 'CN¥',
    DKK: 'Kr',
    EUR: '€',
    GBP: '£',
    HKD: 'HK$',
    IDR: 'Rp',
    ILS: '₪',
    INR: '₹',
    JPY: 'JP¥',
    KRW: '₩',
    MYR: 'RM',
    NOK: 'Nok',
    NZD: 'NZ$',
    RUB: '₽',
    SEK: 'Sek',
    SGD: 'S$',
    THB: '฿',
    TRY: '₺',
    USD: 'US$',
    VND: '₫'
  }

  return symbols[currency] === undefined ? '$' : symbols[currency]
}

export const transferLimits = (currency) => {
  const limits = {
    AUD: '250',
    CAD: '200',
    CNY: '1600',
    CHF: '250',
    DKK: '1500',
    EUR: '200',
    GBP: '200',
    HKD: '1600',
    IDR: '2800000',
    ILS: '800',
    INR: '13500',
    JPY: '20000',
    KRW: '200000',
    MYR: '800',
    NOK: '2000',
    NZD: '250',
    RUB: '13000',
    SEK: '2000',
    SGD: '270',
    THB: '6400',
    TRY: '800',
    USD: '200',
    VND: '4500000'
  }

  return limits[currency] === undefined ? '250' : limits[currency]
}

const getCurrency = (country: string) => {
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
    ID: 'IDR',
    IE: 'EUR',
    IL: 'ILS',
    IN: 'INR',
    IT: 'EUR',
    JP: 'JPY',
    KR: 'KRW',
    MY: 'MYR',
    NO: 'NOK',
    NZ: 'NZD',
    RU: 'RUB',
    SE: 'SEK',
    SG: 'SGD',
    TH: 'THB',
    TR: 'TRY',
    US: 'USD',
    VN: 'VND',
  }

  return currencies[country] === undefined ? 'EUR' : currencies[country]
}

export const hasNoDecimals = (currency: string) : boolean => currency === 'KRW' || currency === 'JPY' || currency === 'IDR' || currency === 'VND'

export const isCommaDecimal = (currency: string) : boolean => currency === 'CHF' || currency === 'EUR' || currency === 'DKK' || currency === 'NOK' || currency === 'SEK' || currency === 'IDR' || currency === 'VND'

export const defaultCurrency = getCurrency(country)
