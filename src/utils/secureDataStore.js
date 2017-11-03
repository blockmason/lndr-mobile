import Expo from 'expo';

export const PRIVATE_KEY = "PRIVATE_KEY"

export const retrievePrivateKey = () => {
  return Expo.SecureStore.getItemAsync(PRIVATE_KEY)
}

//Expo.SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY <-- use
export const savePrivateKey = (key) => {
  return Expo.SecureStore.setItemAsync(PRIVATE_KEY, key)
}

//Used in the clearing of data for the app, on promised, clear db (drop tables)
export const clearPrivateKey = () => {
  return Expo.SecureStore.deleteItemAsync(PRIVATE_KEY)
}

export const hasPrivateKey = (checkKeyCallback) => {
  this.retrievePrivateKey().then((result) => {
    checkKeyCallback(result);
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
