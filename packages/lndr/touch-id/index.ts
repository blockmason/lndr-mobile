import TouchID from 'react-native-touch-id'
import { Platform } from 'react-native'

export const isTouchIdSupported = async () => {
  let isSupported = false
  if (Platform.Version < 23) {
    return isSupported
  }
  
  try {
    isSupported = await TouchID.isSupported().then( (supported, type) => {
      if (supported) {
        return true
      }
      return type === 'TouchID'
    })
  } catch (e) {
    console.log('touch ID not supported', e)
  }

  return isSupported
}
