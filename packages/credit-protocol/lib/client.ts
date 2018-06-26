declare const global

export default class Client {
  baseUrl: String
  fetch: any
  accept: String
  contentType: String
  authorization: any

  constructor(baseUrl, fetch) {
    this.baseUrl = baseUrl
    this.fetch = fetch || global.fetch
  }

  setAccept(accept) {
    this.accept = accept
  }

  setContentType(contentType) {
    this.contentType = contentType
  }

  setAuthorization(authorization) {
    this.authorization = authorization
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
        // debugger
        console.log(`${response.status} ERROR: `, response)
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
    let headers:any = {
      'Accept': (this.accept) ? this.accept : 'application/json, text/plain, */*'
    }
    if (this.authorization)
      headers.Authorization = this.authorization

    return this.handleResponse(
      this.fetch(`${this.baseUrl}${path}`, {
        headers: headers
      })
    )
  }

  post(path, data) {
    console.log(`[fetch] POST ${this.baseUrl}${path} {${Object.keys(data).join(', ')}:${Object.values(data).join(', ')}}`)
    let headers:any = {
      'Accept': (this.accept) ? this.accept : 'application/json, text/plain, */*'
      ,'Content-Type': (this.contentType) ? this.contentType : 'application/json'
    }
    if (this.authorization)
      headers.Authorization = this.authorization

    return this.handleResponse(
      this.fetch(`${this.baseUrl}${path}`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(data)
      })
    )
  }

  delete(path) {
    console.log(`[fetch] DELETE ${this.baseUrl}${path}`)
    let headers:any = {
      'Accept': (this.accept) ? this.accept : 'application/json, text/plain, */*'
    }
    if (this.authorization)
      headers.Authorization = this.authorization

    return this.handleResponse(
      this.fetch(`${this.baseUrl}${path}`,  {
        method: 'delete',
        headers: headers
      })
    )
  }

}
