import TouchID from 'react-native-touch-id'

export const isTouchIdSupported = async () => {
  let isSupported = false
  try {
    isSupported = await TouchID.isSupported().then(type => type === 'TouchID')
  } catch (e) {
    console.log('not supported')
  }

  return isSupported
}
