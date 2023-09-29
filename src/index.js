const axios = require("axios").default
const md5 = require('md5')

function handleResponse(data) {
  data = data.replace("<br />", "\n").split("\n")
  return data.map(item => {
    const match = /^(\d+)\s\[(.+)\]/.exec(item)
    if (match) {
      return {
        code: +match[1],
        message: match[2].trim(),
      }
    }
    return null
  }).filter(Boolean)
}

exports.codes = require('./code.js')

exports.MekongSMS = class MekongSMS {

  constructor({ endpoint, username, password, sender }) {
    this._endpoint = endpoint;
    this._username = username;
    this._password = md5(password);
    this._sender = sender;
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

    if (!url.searchParams.has("sender") && typeof this._sender === 'string') {
      url.searchParams.set("sender", this._sender)
    }

    const response = await axios.get(url.href)
    return handleResponse(response.data)
  }

  async credits() {
    const url = new URL("/api/credits.aspx", this._endpoint)
    url.searchParams.set("username", this._username)
    url.searchParams.set("pass", this._password)
    const response = await axios.get(url.href)
    const message = response.data.split("\n", 1)[0]
    if (isNaN(+message)) return { message: message.trim() }
    return { credit: +message }
  }
}
