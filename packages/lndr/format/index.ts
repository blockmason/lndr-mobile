import { currencySymbols, hasNoDecimals, isCommaDecimal  } from 'lndr/currencies'

declare const Buffer

export const commas = (value, currency) => {
  if(isCommaDecimal(currency)) {
    return String(value).replace(/(\d{3})+$/g,
      full => full.replace(/\d{3}/g, group => `.${group}`)
    ).replace(/^\./, '')
  }
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

export const currencyFormats = (formatType: string) => {
  if (hasNoDecimals(formatType)) {
    return value => {
      const sign = value < 0 ? '-' : ''
      const raw = String(Math.abs(value))
      return `${sign}${commas(raw, formatType) || '0'}`
    }
  } else if (formatType === 'KRWabs' || formatType === 'JPYabs' || formatType === 'IDRabs' || formatType === 'VNDabs') {
    return value => {
      const sign = value < 0 ? '-' : ''
      const raw = String(Math.abs(value))
      return `${commas(raw, formatType.substr(0, 3)) || '0'}`
    }
  } else if(isCommaDecimal(formatType)) {
    return value => {
      const sign = value < 0 ? '-' : ''
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${sign}${commas(left, formatType) || '0'},${leftPad('0', 2, right)}`
    }
  } else if (formatType === 'CHFabs' || formatType === 'EURabs' || formatType === 'DKKabs' || formatType === 'NOKabs' || formatType === 'SEKabs' || formatType === 'IDRabs') {
    return value => {
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${commas(left, formatType.substr(0, 3)) || '0'},${leftPad('0', 2, right)}`
    }
  } else if (formatType.indexOf('abs') !== -1) {
    return value => {
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${commas(left, formatType) || '0'}.${leftPad('0', 2, right)}`
    }
  } else {
    return value => {
      const sign = value < 0 ? '-' : ''
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${sign}${commas(left, formatType) || '0'}.${leftPad('0', 2, right)}`
    }
  }
}

export const amountFormat = (amount: string, currency: string) => {
  if (hasNoDecimals(currency)) {
    const raw = amount
    .replace(/[^\d]/g, '')

    return `${currencySymbols(currency)}${commas(raw, currency)}`
  } else if (isCommaDecimal(currency)) {
    const raw = amount
      .replace(/[^,\d]/g, '')
      .replace(',', 'DOT')
      .replace(/\./g, '')
      .replace('DOT', '.')
      .replace(/^0\d/, x => x[1])
      .replace(/,\d{3\.}/, x => `,${x.substr(-2)}`)
  
    const hasDecimal = amount.indexOf(',') !== -1
  
    if (hasDecimal) {
      let [ left, right ] = raw.split(',')
      while (right.length > 2) {
        left = `${left}${right[0]}`
        right = right.substr(1)
      }
      right = right.length === 1 ? right + '0' : right
      return `${currencySymbols(currency)}${commas(left, currency)},${right}`
    }
  
    return `${currencySymbols(currency)}${commas(raw, currency)}`
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
      right = right.length === 1 ? right + '0' : right
      return `${currencySymbols(currency)}${commas(left, currency)}.${right}`
    }
  
    return `${currencySymbols(currency)}${commas(raw, currency)}`
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
  if(hasNoDecimals(currency)) {
    return parseInt(
      amount.replace(/[^.\d]/g, '')
    )
  } else if(isCommaDecimal(currency)) {
    return parseInt(
      amount
      .replace(/[^.\d]/g, '')
      .replace(/^\d+,?$/, x => `${x}00`)
      .replace(/,\d$/, x => `${x.substr(1)}0`)
      .replace(/,\d\d$/, x => `${x.substr(1)}`)
      .replace(/,/, () => '')
    )
  } else {
    return parseInt(
      amount
      .replace(/[^.\d]/g, '')
      .replace(/^\d+\.?$/, x => `${x}00`)
      .replace(/\.\d$/, x => `${x.substr(1)}0`)
      .replace(/\.\d\d$/, x => `${x.substr(1)}`)
      .replace(/\./, () => '')
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
