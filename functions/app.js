var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var app = express();

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());

// API to charge given card and amount
app.post("/chargeCard", async (request, response) => {
  // step1: create Token for card to charge
  // step2: charge the card.
  try {
    console.log("Inside the cardCharges method", request.body);

    const token = await stripe.tokens.create({
      card: {
        number: request.body.cardNumber,
        exp_month: request.body.cardExpMonth,
        exp_year: request.body.cardExpYear,
        cvc: request.body.cvv,
      },
    });

    // should be removed on production
    console.log("token => ",token.id);

    const charge = await stripe.charges.create({
      amount: request.body.amount * 100,
      currency: 'usd',
      description: request.body.description,
      source: token.id,
      receipt_email: request.body.email
    });

    // should be removed on production
    console.log("charge => ",{"receipt":charge.receipt_url,"status": charge.status,"paid":charge.paid});

    return response.send({ success: true });

  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

// request handlers
module.exports = app;
