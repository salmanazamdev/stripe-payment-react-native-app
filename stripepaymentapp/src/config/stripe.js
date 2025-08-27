export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_YOUR_PUBLISHABLE_KEY_HERE',
  merchantIdentifier: 'merchant.com.stripepaymentapp',
  urlScheme: 'stripepaymentapp', // For redirects
};

export const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:3000' // Android emulator
  : 'https://your-production-api.com';