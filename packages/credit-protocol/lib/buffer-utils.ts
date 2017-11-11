declare const Buffer

export function hexToBuffer(value) {
  if (value.substr(0, 2) !== '0x') {
    throw new Error('Invalid hex string')
  }
  return Buffer.from(value.substr(2), 'hex')
}

export function stringToBuffer(value) {
  return Buffer.from(value)
}

export function bufferToHex(buffer) {
  return '0x' + buffer.toString('hex')
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
