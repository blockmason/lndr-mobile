declare const Buffer

export function hexToBuffer(value) {
  if (value.substr(0, 2) === '0x') {
    value = value.substr(2)
  }

  return Buffer.from(value, 'hex')
}

export function stringToBuffer(value) {
  return Buffer.from(value)
}

export function bufferToHex(buffer) {
  return buffer.toString('hex')
}

export function int32ToBuffer(value) {
  const hexValue = value.toString(16)
  const z = '00000000', x = `${z}${z}`
  const stringValue = `${x}${x}${x}${x}`.replace(
    new RegExp(`.{${hexValue.length}}$`),
    hexValue
  )
  return Buffer.from(stringValue, 'hex')
}
