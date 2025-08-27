const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE'); // Replace with your actual secret key
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple payment endpoint - NO WEBHOOKS NEEDED
app.post('/payment-sheet', async (req, res) => {
  try {
    const { amount = 2000 } = req.body; // $20.00 default

    // Create customer
    const customer = await stripe.customers.create();

    // Create ephemeral key
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2025-07-30.basil' }
    );

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
    });

    // Return everything needed
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });

  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Simple success endpoint to check payment status
app.get('/payment-status/:paymentIntentId', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntentId);
    res.json({ status: paymentIntent.status });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

console.log('🚀 Server starting on port 3000...');
app.listen(3000, () => {
  console.log('✅ Server running! Test it at http://localhost:3000');
});