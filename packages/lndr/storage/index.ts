import localStorage from 'react-native-local-storage'

export default class Storage {
  key: string

  constructor(key: string) {
    this.key = key
  }

  async get() {
    const buffer = await localStorage.get(this.key)
    return buffer ? buffer.toString() : null
  }

  async set(value: string) {
    if (typeof value !== 'string') {
      throw new Error('can only set string values')
    }

    await localStorage.save(this.key, value)
  }

  async remove() {
    await localStorage.remove(this.key)
  }
}
