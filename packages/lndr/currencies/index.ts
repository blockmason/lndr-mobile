import { NativeModules, Platform } from 'react-native'

let locale = 'en-US'

try {
  if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale
  } else {
    locale = NativeModules.Localization.deviceLocale.replace('-', '_')
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
    PLN: 'zł',
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

export const TRANSFER_LIMIT_STANDARD = 'standard'
export const TRANSFER_LIMIT_BCPT = 'bcpt'
export const TRANSFER_LIMIT_KYC = 'kyc'

const currencyLimits = {}
currencyLimits[TRANSFER_LIMIT_STANDARD] = {
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
  PLN: '750',
  RUB: '13000',
  SEK: '2000',
  SGD: '270',
  THB: '6400',
  TRY: '800',
  USD: '200',
  VND: '4500000',
}
currencyLimits[TRANSFER_LIMIT_BCPT] = {
  AUD: '900',
  CAD: '750',
  CNY: '6000',
  CHF: '900',
  DKK: '5000',
  EUR: '700',
  GBP: '650',
  HKD: '6000',
  IDR: '10000000',
  ILS: '2700',
  INR: '50000',
  JPY: '75000',
  KRW: '750000',
  MYR: '3000',
  NOK: '27500',
  NZD: '800',
  PLN: '2500',
  RUB: '50000',
  SEK: '7500',
  SGD: '1000',
  THB: '20000',
  TRY: '2800',
  USD: '750',
  VND: '15000000',
}
currencyLimits[TRANSFER_LIMIT_KYC] = {
  AUD: '2500',
  CAD: '2000',
  CNY: '16000',
  CHF: '2500',
  DKK: '15000',
  EUR: '2000',
  GBP: '2000',
  HKD: '16000',
  IDR: '28000000',
  ILS: '8000',
  INR: '135000',
  JPY: '200000',
  KRW: '2000000',
  MYR: '8000',
  NOK: '20000',
  NZD: '2500',
  PLN: '7500',
  RUB: '130000',
  SEK: '20000',
  SGD: '2700',
  THB: '64000',
  TRY: '8000',
  USD: '2000',
  VND: '45000000',
}

export const transferLimits = (currency: string, level = TRANSFER_LIMIT_STANDARD) => {
  return currencyLimits[level][currency] === undefined ? '250' : currencyLimits[level][currency]
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
    PL: 'PLN',
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

export const isCommaDecimal = () : boolean => {
  return country === 'AL' || country === 'DZ' || country === 'AD' || country === 'AO' || country === 'AR' || country === 'AM' || country === 'AT' || country === 'AZ' || country === 'BY' || country === 'BE' || country === 'BO' || country === 'BA' || country === 'BR' || country === 'BG' || country === 'CM' || locale === 'fr_CA' || country === 'CL' || country === 'CO' || country === 'CN' || country === 'CN' || country === 'CU' || country === 'CY' || country === 'CZ' || country === 'DK' || country === 'DO' || country === 'EC' || country === 'EE' || country === 'FO' || country === 'FI' || country === 'FR' || country === 'DE' || country === 'GE' || country === 'GR' || country === 'GL' || country === 'HU' || country === 'IS' || country === 'ID' || country === 'IT' || country === 'KZ' || country === 'KR' || country === 'KG' || country === 'LV' || country === 'LB' || country === 'LT' || country === 'LU' || country === 'LU' || country === 'LU' || country === 'MD' || country === 'MN' || country === 'MA' || country === 'MZ' || country === 'NA' || country === 'TH' || country === 'NO' || country === 'PY' || country === 'PE' || country === 'PL' || country === 'PT' || country === 'RO' || country === 'RO' || country === 'RS' || country === 'SK' || country === 'SI' || country === 'ZA' || country === 'ES' || country === 'SE' || country === 'CH' || country === 'TN' || country === 'TR' || country === 'TM' || country === 'UA' || country === 'UY' || country === 'UZ' || country === 'VU' || country === 'VN'
}

export const defaultCurrency = getCurrency(country)
