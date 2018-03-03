import english from './english'

import korean from './korean'

import japanese from './japanese'

import defaultCurrency from 'lndr/default-currency'

let exportLanguage = english

if(defaultCurrency === 'KRW') {
  exportLanguage = korean
} else if(defaultCurrency === 'JPY') {
  exportLanguage = japanese
}

export const currencies = {
  USD: '$',
  JPY: '¥',
  KRW: '₩'
}

export const transferLimits = {
  USD: '200',
  JPY: '20000',
  KRW: '200000'
}

export default exportLanguage
