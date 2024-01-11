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
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.body.amount * 100,
      currency: 'usd',
      customer: request.body.cusotmer_id,
      payment_method: request.body.payment_method_id,
      confirm: true,
      description: request.body.description
    });
    console.log("Completed the stripe method invocation", JSON.stringify(paymentIntent));
    return response.send(generateResponse(paymentIntent));

  } catch (e) {
    return response.send({ error: e.message });
  }
});
const generateResponse = (intent) => {
  if (intent.status === "succeeded") {
    return {
      success: true,
    };
  } else {
    return {
      error: "Invalid PaymentIntent status",
    };
  }
};

module.exports = app;
