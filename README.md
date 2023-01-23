# stripe-chp-payment
The backend for a serverless stripe application.
Built with AWS Lambda and the Serverless Framework.

## Setup

### Prerequisites

- Node.js & NPM
- Yarn
- [The Serverless Framework](https://serverless.com/framework/)

### Install dependencies

```
yarn
```

### Lint

```
yarn eslint
```

### Deploy

```
serverless deploy
serverless deploy --aws-profile trushar
```

## Configuration

Enter your configuration variables in `secrets.json`. Example:

```javascript
{
  "stripeSecretKey": "sk_test_123"
}
```

You need:

- Your Stripe **secret key**
