### MekongSMS Node.js Client (Unofficial)

This implementation is based on MekongSMS API version 2.1.

### Install

```shell
npm install mekongsms
```

## Usage

Initialize MekongSMS client.

```javascript
const client = new MekongSMS({
	endpoint: "https://sandbox.mekongsms.com",
	username: "example@example.com",
	password: "example",
});
```

### Send SMS

Send an SMS to one or multitple phone numbers.

```javascript
await client.send({
	international: false,
	phoneNumbers: ["85512345678", "85512345679", "85512345688"],
	text: "Hello, world",
	customData: "user_01",
	sender: "Example",
	statusCallback: "https://example.com/callback"
});
```

### Check Credits

Check available credit associated with the account. 

```javascript
const value = await client.credits();
// => { "credit": 1234 }
```

### Status Callback

Request Body

```json
[
  {
    "campaignid": 9999999999,
    "to": "85512341234",
    "from": "Sender Name",
    "senttime": "2023-01-01 11:11:11",
    "receivedtime": "2023-01-01 11:11:11",
    "status": "Delivered"
  }
]
```


### License

MIT
