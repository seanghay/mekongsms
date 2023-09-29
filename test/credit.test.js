const { MekongSMS } = require('../')

async function main() {

  const client = new MekongSMS({
    endpoint: "https://sandbox.mekongsms.com",
    username: "",
    password: ""
  })

  const result = await client.send({
    international: false,
    phoneNumbers: [""],
    text: "Hello, world",
    customData: "user_01",
  })

  console.log(await client.delivery({ startDate: new Date().toISOString(), endDate: new Date().toISOString() }))

}

main()