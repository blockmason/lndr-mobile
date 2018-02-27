import defaultCurrency from 'lndr/default-currency'

import { currencies } from 'language'

declare const Buffer

export const commas = value => {
  return String(value).replace(/(\d{3})+$/g,
    full => full.replace(/\d{3}/g, group => `,${group}`)
  ).replace(/^,/, '')
}

export const leftPad = (pad, length, value) => {
  while (value.length > length && value[0] === pad) {
    value = value.substr(1)
  }
  while (value.length < length) {
    value = `${pad}${value}`
  }
  return value
}

export const currencyFormats = {
  USD: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
    return `${sign}${commas(left) || '0'}.${leftPad('0', 2, right)}`
  },
  
  USDabs: value => {
    const raw = String(Math.abs(value))
    const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
    return `${commas(left) || '0'}.${leftPad('0', 2, right)}`
  },
  
  KRW: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  KRWabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
  JPY: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  JPYabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  }
}

export const amountFormat = (amount: string, currency: string) => {
  if (currency === 'USD') {
    const raw = amount
      .replace(/[^\.\d]/g, '')
      .replace('.', 'DOT')
      .replace(/\./g, '')
      .replace('DOT', '.')
      .replace(/^0\d/, x => x[1])
      .replace(/\.\d{3,}/, x => `.${x.substr(-2)}`)
  
    const hasDecimal = amount.indexOf('.') !== -1
  
    if (hasDecimal) {
      let [ left, right ] = raw.split('.')
      while (right.length > 2) {
        left = `${left}${right[0]}`
        right = right.substr(1)
      }
      return `${currencies[currency]}${commas(left)}.${right}`
    }
  
    return `${currencies[currency]}${commas(raw)}`
    
  } else {
    const raw = amount
    .replace(/[^\d]/g, '')

    return `${currencies[currency]}${commas(raw)}`
  }
}

export const formatNick = nick => nick.replace(/[^A-Za-z0-9]/g, '')

export const formatEmail = email => email.replace(/[^A-Za-z0-9@\._\-!#$%&'*+\-\/=?^_`{|}~]/g, '')

export const formatMemo = memo => {
  const updatedMemo = memo.replace(/^\s/, '').replace(/\s\s$/, ' ')
  const memoBuffer = Buffer.from(updatedMemo, 'utf8')
  return memoBuffer.slice(0, 32).toString('utf8')
}

export const formatPin = pin => pin.replace(/[^0-9]/g, '')

export const formatLockTimeout = timeout => timeout.replace(/[^0-9]/g, '')

export const ethAddress = addr => addr.replace(/[g-z]/gi, '').replace(/[^a-z0-9]/gi, '').toLowerCase()

export const ethAmount = amount => amount.replace(/[^0-9\.]/g, '')

export const emailFormatIncorrect = email => !( email.length > 4 && email.indexOf('@') > 0 && email.indexOf('.') > 2 )

export const bcptAmount = amount => amount.replace(/[^0-9]/g, '')
