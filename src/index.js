const axios = require("axios").default
const md5 = require('md5')

exports.codes = require('./code.js')

exports.MekongSMS = class MekongSMS {
  constructor({ endpoint, username, password }) {
    this._endpoint = endpoint
    this._username = username
    this._password = md5(password)
  }

  async send({ text, customData, sender, phoneNumbers, international } = {}) {
    if (typeof phoneNumbers === 'string') phoneNumbers = phoneNumbers.split(";")
    const url = new URL("/api/sendsms.aspx", this._endpoint)
    url.search = new URLSearchParams(Object.entries({
      smstext: text,
      cd: customData,
      int: international ? 1 : undefined,
      gsm: phoneNumbers ? phoneNumbers.join(";") : undefined,
      sender,
    }).filter(([, b]) => b !== null && b !== undefined))
    url.searchParams.set("username", this._username)
    url.searchParams.set("pass", this._password)
    const response = await axios.get(url.href)
    return response.data
  }

  async credits() {
    const url = new URL("/api/credits.aspx", this._endpoint)
    url.searchParams.set("username", this._username)
    url.searchParams.set("pass", this._password)
    const response = await axios.get(url.href)
    return response.data
  }

  async delivery({ startDate, endDate }) {
    const url = new URL("/api/DeliveryDownload.aspx", this._endpoint)
    url.searchParams.set("username", this._username)
    url.searchParams.set("pass", this._password)
    url.searchParams.set("sd", startDate)
    url.searchParams.set("ed", endDate)
    return url.href
  }

}
