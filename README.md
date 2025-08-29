# 💳 Stripe Payment Sheet - React Native App

A complete, production-ready React Native application demonstrating Stripe Payment Sheet integration with TypeScript, featuring secure payment processing, beautiful UI, and comprehensive error handling.

[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment%20Sheet-green.svg)](https://stripe.com/docs/payments/payment-sheet)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

## ✨ Features

- 🔒 **PCI Compliant** - Secure payment processing without handling sensitive card data
- 📱 **Native UI** - Beautiful Payment Sheet that slides up from bottom
- 💳 **Multiple Payment Methods** - Cards, Apple Pay, Google Pay support
- 🛡️ **Built-in Security** - Fraud protection and 3D Secure authentication
- 🎯 **TypeScript Support** - Full type safety and IntelliSense
- 🔄 **Real-time Validation** - Instant card validation and error feedback
- 📊 **Comprehensive Logging** - Detailed error handling and debugging
- 🌍 **Production Ready** - Best practices for deployment and security

<!-- ## 📱 Screenshots

| Payment Screen | Payment Sheet | Success Screen |
|:-------------:|:-------------:|:-------------:|
| Beautiful checkout UI | Native payment form | Payment confirmation | -->

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- React Native development environment setup
- Stripe account ([Create free account](https://dashboard.stripe.com/register))
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/salmanazamdev/stripe-payment-react-native-app.git
cd stripe-payment-react-native-app
```

2. **Install dependencies**
```bash
# Install React Native dependencies
npm install

# Install backend dependencies
cd stripe-backend
npm install
cd ..
```

3. **Get your Stripe keys**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy your **Publishable key** and **Secret key**

4. **Configure your keys**

   **Backend (`stripe-backend/server.js`):**
   ```javascript
   const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE');
   ```

   **Frontend (`App.tsx`):**
   ```typescript
   setPublishableKey('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
   ```

5. **Run the application**

   **Terminal 1 - Start Backend:**
   ```bash
   cd stripe-backend
   node server.js
   # Should see: ✅ Server running on port 3000
   ```

   **Terminal 2 - Start React Native:**
   ```bash
   npx react-native run-android
   ```

6. **Test the payment**
   - Tap "Pay Now" button
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date and CVC
   - Complete the payment!

## 🏗️ Project Structure

```
stripe-payment-react-native-app/
├── 📱 React Native App
│   ├── App.tsx                     # Main app with StripeProvider
│   ├── src/
│   │   └── components/
│   │       └── CheckoutScreen.tsx  # Payment UI and logic
│   └── package.json
│
├── 🖥️ Backend Server
│   ├── server.js                   # Express server with Stripe
│   ├── package.json
│   └── .env.example
│
└── 📚 Documentation
    ├── README.md
    └── docs/
        ├── API.md
        └── DEPLOYMENT.md
```

## 🔧 Configuration

### Environment Variables

Create `stripe-backend/.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
PORT=3000
```

### Network Configuration

**For Android Emulator:**
```typescript
const API_URL = 'http://10.0.2.2:3000';
```

**For Physical Device:**
```typescript
const API_URL = 'http://YOUR_COMPUTER_IP:3000';
```

## 🎯 How It Works

1. **App Initialization** - Stripe Provider sets up with publishable key
2. **Payment Setup** - App calls backend to create payment intent
3. **Backend Processing** - Server creates customer, ephemeral key, and payment intent
4. **Payment Sheet** - Beautiful native UI handles card input
5. **Secure Processing** - Stripe processes payment securely
6. **Result Handling** - App shows success/error feedback

## 🧪 Testing

### Test Cards

| Card Number | Description |
|:------------|:------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires authentication |

### Running Tests

```bash
# Run React Native tests
npm test

# Run backend tests
cd stripe-backend
npm test
```

## 🚀 Production Deployment

### Security Checklist

- [ ] Environment variables for all keys
- [ ] HTTPS enabled for all endpoints
- [ ] Webhook signature verification
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] User authentication added

### Backend Deployment

**Option 1: Heroku**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set STRIPE_SECRET_KEY=sk_live_your_live_key
git push heroku main
```

**Option 2: Railway/Vercel**
- Deploy backend to your preferred platform
- Update API_URL in React Native app
- Configure environment variables

### Mobile App Deployment

**Android:**
```bash
cd android
./gradlew assembleRelease
```

**iOS:**
```bash
cd ios
xcodebuild -workspace StripePaymentApp.xcworkspace -scheme StripePaymentApp archive
```

## 📊 API Endpoints

### POST `/payment-sheet`

Creates payment intent and returns client secrets for Payment Sheet.

**Response:**
```json
{
  "paymentIntent": "pi_1234567890_secret_abcdef",
  "ephemeralKey": "ek_test_1234567890",
  "customer": "cus_1234567890",
  "publishableKey": "pk_test_..."
}
```

### GET `/`

Health check endpoint.

**Response:**
```json
{
  "message": "✅ Stripe server is running!"
}
```

## 🛠️ Troubleshooting

### Common Issues

**❌ "Network request failed"**
- Check if backend server is running
- Verify API_URL is correct
- For physical devices, use computer's IP address

**❌ "Invalid API key"**
- Double-check your Stripe keys
- Ensure you're using test keys for development
- Verify keys are properly set in environment variables

**❌ "Payment failed"**
- Use valid test card numbers
- Check card expiry date is in the future
- Ensure sufficient test balance

**❌ Payment Sheet not opening**
- Check server logs for errors
- Verify payment intent creation is successful
- Use "Retry Setup" button to reinitialize

### Debug Mode

Enable detailed logging:

```typescript
// Add to CheckoutScreen.tsx
console.log('🔍 Debug mode enabled');
```

## 🔄 Next Steps

**Enhance Your Payment System:**

- [ ] **Webhooks** - Handle payment confirmations
- [ ] **Subscriptions** - Recurring payments
- [ ] **Customers** - Save payment methods
- [ ] **Analytics** - Track payment metrics
- [ ] **Multi-currency** - Support global payments
- [ ] **Discounts** - Coupon system
- [ ] **Refunds** - Handle payment returns

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Stripe](https://stripe.com) for excellent payment infrastructure
- [React Native Community](https://reactnative.dev) for the amazing framework
- All contributors and testers

## 📞 Support

- 💬 **Issues**: [GitHub Issues](https://github.com/salmanazamdev/stripe-payment-react-native-app/issues)
- 📖 **Documentation**: [Stripe Docs](https://stripe.com/docs)

---

### ⭐ Star this repository if it helped you!

**Built with ❤️ by [Salman]**

---

<!-- ## Related Projects

- [OAuth 2.0 React Native Implementation](link-to-your-oauth-repo)
- [Complete React Native Authentication](link-to-auth-repo)
- [React Native Best Practices](link-to-best-practices-repo) -->

## Tags

`react-native` `stripe` `payments` `mobile-payments` `typescript` `nodejs` `express` `payment-sheet` `mobile-development` `fintech` `pci-compliance` `android` `ios`