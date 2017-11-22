import localStorage from 'react-native-local-storage'

export const MNEMONIC = 'MNEMONIC'
export const HASHED_PASSWORD_CHECK = 'HASHED_PASSWORD_CHECK'

export const retrieveMnemonic = () => {
  return localStorage.get(MNEMONIC)
}

export const saveMnemonic = (key) => {
  return localStorage.save(MNEMONIC, key)
}

export const removeMnemonic = () => {
  return localStorage.remove(MNEMONIC)
}

export const hasMnemonic = (checkKeyCallback) => {
  this.retrieveMnemonic().then((result) => {
    checkKeyCallback(result)
  })
}

export const retrieveHashedPassword = () => {
  return localStorage.get(HASHED_PASSWORD_CHECK)
}

export const saveHashedPassword = (key) => {
  return localStorage.save(HASHED_PASSWORD_CHECK, key)
}

export const removeHashedPassword = () => {
  return localStorage.remove(HASHED_PASSWORD_CHECK)
}

export const hasHashedPassword = (checkKeyCallback) => {
  this.retrieveHashedPassword().then((result) => {
    checkKeyCallback(result)
  })
}
