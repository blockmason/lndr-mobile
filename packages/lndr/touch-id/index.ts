import TouchID from 'react-native-touch-id'
import { Platform } from 'react-native'

export const isTouchIdSupported = async () => {
  let isSupported = false
  if (Platform.Version < 23) {
    return isSupported
  }
  
  try {
    isSupported = await TouchID.isSupported().then(type => type === 'TouchID')
  } catch (e) {
    console.log('not supported')
  }

  return isSupported
}
