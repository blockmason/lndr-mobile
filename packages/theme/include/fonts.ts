import { Platform } from 'react-native'

export const large = {
  fontSize: 20
}

export const medium = {
  fontSize: 16
}

export const small = {
  fontSize: 14
}

export const wide = {
  letterSpacing: 0.5
}

export const bold = {
  fontWeight: 'bold'
}

export const monospace = {
  fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace'
}
