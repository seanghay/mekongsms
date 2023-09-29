### MekongSMS Node.js Client (Unofficial)

This implementation is based on MekongSMS API version 2.1.

### Install

```shell
npm install mekongsms
```

## Usage

```javascript
const client = new MekongSMS({
	endpoint: "https://sandbox.mekongsms.com",
	username: "example@example.com",
	password: "example",
});
```

### Send SMS

```javascript
const result = await client.send({
	international: false,
	phoneNumbers: ["85512345678", "85512345679", "85512345688"],
	text: "Hello, world",
	customData: "user_01",
});
```

### Check Credits

```javascript
const credit = await client.credits()
```

### Download Delivery Reports

```javascript
const report = await client.delivery({
  start: new Date("2021-01-01"),
  end: new Date("2022-01-01")
})
```
