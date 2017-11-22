declare const global

export default class Client {
  baseUrl: String
  fetch: any

  constructor(baseUrl, fetch) {
    this.baseUrl = baseUrl
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

  get(path) {
    console.log(`[fetch] GET ${this.baseUrl}${path}`)

    return this.handleResponse(this.fetch(`${this.baseUrl}${path}`))
  }

  post(path, data) {
    console.log(`[fetch] POST ${this.baseUrl}${path} {${Object.keys(data).join(', ')}}`)

    return this.handleResponse(
      this.fetch(`${this.baseUrl}${path}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    )
  }

}
