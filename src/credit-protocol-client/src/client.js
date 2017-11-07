import CreditRecord from './credit-record'

export default class CreditProtocolClient {
  constructor(baseUrl, fetch) {
    this.baseUrl = baseUrl
    this.fetch = fetch || global.fetch
  }

  handleResponse(promise) {
    return promise
      .then(response => {
        if (response.status < 300) {
          return response.json()
        }
        throw new Error(`HTTP Response ${response.status}`)
      })
      .catch(error => {
        console.error(`[fetch] ERROR ${error.message}`)
      })
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

  getNonce(address1, address2) {
    return this.get(`/nonce/${address1}/${address2}`)
  }

  async createCreditRecord(ucac, address1, address2, amount, memo) {
    const nonce = await this.getNonce(address1, address2)
    return new CreditRecord(ucac, address1, address2, amount, memo, nonce)
  }

  async submitCreditRecord(creditRecord, signature) {
    const {
      creditorAddress: creditor,
      debtorAddress: debtor,
      amount,
      memo
    } = creditRecord

    return this.post('/submit_signed', {
      creditor,
      debtor,
      amount,
      memo,
      signature
    })
  }
}
