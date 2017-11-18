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

export const cents = value => {
  const raw = String(value)
  const [ left, right ] = [ raw.substr(0, raw.length - 2), raw.substr(-2) ]
  return `$${commas(left)}.${right}`
}

export const currency = value => {
  const raw = value
    .replace(/[^\.\d]/g, '')
    .replace('.', 'DOT')
    .replace(/\./g, '')
    .replace('DOT', '.')
    .replace(/^\./, '0.')
    .replace(/^0\d/, x => x[1])
    .replace(/\.\d{3,}/, x => `.${x.substr(-2)}`)

  const hasDecimal = value.indexOf('.') !== -1

  if (hasDecimal) {
    let [ left, right ] = raw.split('.')
    while (right.length > 2) {
      left = `${left}${right[0]}`
      right = right.substr(1)
    }
    return `$${commas(left)}.${right}`
  }

  return `$${commas(raw)}`
}
