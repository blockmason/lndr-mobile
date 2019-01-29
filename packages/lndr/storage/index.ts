import { AsyncStorage } from 'react-native'

export default class Storage {
  key: string

  constructor(key: string) {
    this.key = key
  }

  async get() {
    const jsonData: any = await AsyncStorage.getItem(this.key)
    return JSON.parse(jsonData)
  }

  async set(value: any) {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(this.key, jsonValue)
  }

  async remove() {
    await AsyncStorage.removeItem(this.key)
  }
}
