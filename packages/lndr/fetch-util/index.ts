declare const global

export default class GasPrice {
  fetch: any

  constructor(fetch) {
    this.fetch = fetch || global.fetch
  }

  async handleResponse(promise) {
    try {
      const response = await promise

      if (response.status === 204) {
        return
      }

      if (response.status < 300) {
        return response.json()
      }

      if (response.status === 400 || response.status === 500) {
        debugger
      }

      throw new Error(`HTTP Response ${response.status}`)
    }

    catch(error) {
      console.warn(`[fetch] ERROR ${error.message}`)
      throw error
    }
  }

  get(url) {
    console.log(`[fetch] GET ${url}`)

    return this.handleResponse(this.fetch(`${url}`))
  }
}
