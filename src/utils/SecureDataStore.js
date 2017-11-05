// import Expo from 'expo'

export const PRIVATE_KEY = 'PRIVATE_KEY'

const fakeStorage = {}

export const retrievePrivateKey = () => {
  return Promise.resolve(fakeStorage[PRIVATE_KEY])
}

// Expo.SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY <-- use
export const savePrivateKey = (key) => {
  fakeStorage[PRIVATE_KEY] = key
  return Promise.resolve()
}

// Used in the clearing of data for the app, on promised, clear db (drop tables)
export const clearPrivateKey = () => {
  delete fakeStorage[PRIVATE_KEY]
  return Promise.resolve()
}

export const hasPrivateKey = (checkKeyCallback) => {
  this.retrievePrivateKey().then((result) => {
    checkKeyCallback(result)
  })
}

// Example:
// savePrivateKey('private').then((result) => {
//   console.log("save");
//
//   retrievePrivateKey().then((result) => {
//     console.log("get");
//     console.log(result);
//   })
// })
