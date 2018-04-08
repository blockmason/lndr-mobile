import { defaultCurrency, currencySymbols, transferLimits  } from 'lndr/currencies'

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
  AUD: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  AUDabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },

  CAD: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  CADabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
  CHF: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  CHFabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
  CNY: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  CNYabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },

  DKK: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  DKKabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
  EUR: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  EURabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
  GBP: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  GBPabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },

  HKD: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  HKDabs: value => {
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
  
  NOK: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  NOKabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },

  NZD: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  NZDabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
  SEK: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${sign}${commas(raw) || '0'}`
  },
  
  SEKabs: value => {
    const sign = value < 0 ? '-' : ''
    const raw = String(Math.abs(value))
    return `${commas(raw) || '0'}`
  },
  
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
}

export const amountFormat = (amount: string, currency: string) => {
  if (currency === 'KRW' || currency === 'JPY') {
    const raw = amount
    .replace(/[^\d]/g, '')

    return `${currencySymbols[currency]}${commas(raw)}`
    
  } else {
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
      return `${currencySymbols[currency]}${commas(left)}.${right}`
    }
  
    return `${currencySymbols[currency]}${commas(raw)}`
  }
}

export const formatNick = nick => nick.toLowerCase().replace(/[^a-z0-9]/g, '')

export const formatEmail = email => email.replace(/[^A-Za-z0-9@\._\-!#$%&'*+\-\/=?^_`{|}~]/g, '')

export const formatMemo = memo => {
  const updatedMemo = memo.replace(/^\s/, '').replace(/\s\s$/, ' ')
  const memoBuffer = Buffer.from(updatedMemo, 'utf8')
  return memoBuffer.slice(0, 32).toString('utf8')
}

export const sanitizeAmount = (amount, currency) => {
  if(currency === 'USD') {
    return parseInt(
      amount
      .replace(/[^.\d]/g, '')
      .replace(/^\d+\.?$/, x => `${x}00`)
      .replace(/\.\d$/, x => `${x.substr(1)}0`)
      .replace(/\.\d\d$/, x => `${x.substr(1)}`)
      .replace(/\./, () => '')
    )
  } else {
    return parseInt(
      amount.replace(/[^.\d]/g, '')
    )
  }
}

export const formatPin = pin => pin.replace(/[^0-9]/g, '')

export const formatLockTimeout = timeout => timeout.replace(/[^0-9]/g, '')

export const ethAddress = addr => addr.replace(/[g-z]/gi, '').replace(/[^a-z0-9]/gi, '').toLowerCase()

export const ethAmount = amount => amount.replace(/[^0-9\.]/g, '')

export const emailFormatIncorrect = email => !( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) )

export const nickLengthIncorrect = nick => typeof nick === 'string' && nick.length < 3

export const bcptAmount = amount => amount.replace(/[^0-9]/g, '')
