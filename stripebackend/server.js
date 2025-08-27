const express = require('express');
const stripe = require('stripe')('sk_test_51S0hSmRyizKl6LlzqPo9fJIghSJbocpGtAId2J6TZyVpJDTsGwjiyop4yAK1N5z5xus2KZAqeHSPHDntDVY93L3T00RL0IHUPp'); // Replace with your secret key

const cors = require('cors');
app.use(cors());

const app = express();
app.use(express.json());

// Exact endpoint from Stripe docs
app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2025-07-30.basil'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51S0hSmRyizKl6LlzkFz6qjKQEi0xCA6TjBUjQioFdxdqqu2PBWCgpqf63sDjmKyyU4h0uvkcF2qbWDdCN9M1mk2C003SvOSe45'
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});