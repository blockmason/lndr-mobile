import { currencySymbols, hasNoDecimals, isCommaDecimal, transferLimits } from 'lndr/currencies'

declare const Buffer

export const commas = (value) => {
  if(isCommaDecimal()) {
    return String(value).replace('.', '').replace(/(\d{3})+$/g,
      full => full.replace(/\d{3}/g, group => `.${group}`)
    ).replace(/^\./, '')
  }
  return String(value).replace(',', '').replace(/(\d{3})+$/g,
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
      return `${sign}${commas(raw) || '0'}`
    }
  } else if (formatType === 'KRWabs' || formatType === 'JPYabs' || formatType === 'IDRabs' || formatType === 'VNDabs') {
    return value => {
      const raw = String(Math.abs(value))
      return `${commas(raw) || '0'}`
    }
  } else if(isCommaDecimal() && formatType.indexOf('abs') !== -1) {
    return value => {
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${commas(left) || '0'},${leftPad('0', 2, right)}`
    }
  } else if (isCommaDecimal()) {
    return value => {
      const sign = value < 0 ? '-' : ''
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${sign}${commas(left) || '0'},${leftPad('0', 2, right)}`
    }
  } else if (formatType.indexOf('abs') !== -1) {
    return value => {
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${commas(left) || '0'}.${leftPad('0', 2, right)}`
    }
  } else {
    return value => {
      const sign = value < 0 ? '-' : ''
      const raw = String(Math.abs(value))
      const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
      return `${sign}${commas(left) || '0'}.${leftPad('0', 2, right)}`
    }
  }
}

export const amountFormat = (amount: string, currency: string, notTextInput: boolean) => {
  let result = ''
  if (hasNoDecimals(currency)) {
    const raw = amount
    .replace(/[^\d]/g, '')

    result = `${currencySymbols(currency)}${commas(raw)}`
  } else if (isCommaDecimal()) {
    const raw = amount
      .replace(/[^,\d]/g, '')
      .replace(',', 'DOT')
      .replace(/,/g, '')
      .replace('DOT', ',')
      .replace(/^0\d/, x => x[1])
      .replace(/,\d{3\.}/, x => `,${x.substr(-2)}`)

    const hasDecimal = amount.indexOf(',') !== -1

    if (hasDecimal) {
      let [ left, right ] = raw.split(',')
      while (right.length > 2) {
        left = `${left}${right[0]}`
        right = right.substr(1)
      }
      result = `${currencySymbols(currency)}${commas(left)},${right}`
    } else {
      result = `${currencySymbols(currency)}${commas(raw)}`
    }
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
      result = `${currencySymbols(currency)}${commas(left)}.${right}`
    } else {
      result = `${currencySymbols(currency)}${commas(raw)}`
    }
  }

  if(notTextInput) {
    if(result && (result.slice(-1) === ',' || result.slice(-1) === '.')) {
      result = result.slice(0, -1)
    } else if(result && (result.slice(-2, -1) === ',' || result.slice(-2, -1) === '.')) {
      result += '0'
    }
  }
  
  return result
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
  } else if(isCommaDecimal()) {
    return parseInt(
      amount
      .replace(/[^,\d]/g, '')
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

export const ethAmount = amount => {
  if(isCommaDecimal()) {
    return amount.replace(/[^0-9,]/g, '')
  } else {
    return amount.replace(/[^0-9\.]/g, '')
  }
}

export const emailFormatIncorrect = email => !( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) )

export const nickLengthIncorrect = nick => typeof nick === 'string' && nick.length < 3

export const bcptAmount = amount => amount.replace(/[^0-9]/g, '')

export const convertCommaDecimalToPoint = (amount: string) : string => {
  if(!isCommaDecimal()) {
    return amount
  }
  if(amount.match(/\,[0-9]{3}$/) !== null) {
    amount = amount.slice(-1)
  }
  if(amount.match(/\,[0-9]{2}$/) !== null) {
    const end = amount.slice(-2)

    return amount.slice(0, -3).replace(/\./, ',').concat('.').concat(end)
  } else if(amount.match(/\,[0-9]{1}$/) !== null) {
    const end = amount.slice(-1)

    return amount.slice(0, -2).replace(/\./, ',').concat('.').concat(end)
  }
  return amount
}

export const formatEthToFiat = (ethBalance: string, ethExchange: string, currency: string) : string => {
  let converted = String( Number(ethBalance) * Number(ethExchange) ).slice(0, 8)
  if(converted.slice(-2, -1) === '.') {
    converted = converted + '0'
  } else if(converted.slice(-1) === '.') {
    converted = converted.slice(-1)
  }
  
  return ` (${currencySymbols(currency)}${isCommaDecimal() ? converted.replace('.', ',') : converted})`
}

export const formatCommaDecimal = (amount: string) : string => isCommaDecimal() ? amount.replace('.', ',') : amount

export const formatSettlementAmount = (amount: string, primaryCurrency: string) : string => {
  const adjustedBalance = hasNoDecimals(primaryCurrency) ? Number(amount) : Number(amount) / 100

  const commaAdjusted = isCommaDecimal() ? String(adjustedBalance).replace('.', ',') : String(adjustedBalance)

  let formattedAmount = amountFormat(commaAdjusted, primaryCurrency, true)
  
  return formattedAmount
}

export const formatEthRemaining = (ethExchange: Function, ethSentPastWeek: number, primaryCurrency: string) => {
  const remaining = String(Number(transferLimits(primaryCurrency)) - Number(ethSentPastWeek) * Number(ethExchange(primaryCurrency)))
  const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
  return isCommaDecimal() ? remaining.slice(0, end).replace('.', ',') : remaining.slice(0, end)
}

export const cleanFiatAmount = (amount: string) : number => {
  if(isCommaDecimal()) {
    amount = amount.replace('.', '').replace(',', '.')
  } else {
    amount = amount.replace(',', '')
  }
  const cleanAmount = amount.replace(/[^0-9\.]/g, '')
  if(cleanAmount.slice(-1) === '.') {
    return 0
  }
  return Number(cleanAmount)
}
