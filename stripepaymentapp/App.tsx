import React, { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './src/components/CheckoutScreen';

function App(): JSX.Element {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    // In production, fetch this from your server
    // For now, use your actual publishable key
    setPublishableKey('pk_test_51S0hSmRyizKl6LlzkFz6qjKQEi0xCA6TjBUjQioFdxdqqu2PBWCgpqf63sDjmKyyU4h0uvkcF2qbWDdCN9M1mk2C003SvOSe45');
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider 
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <CheckoutScreen />
    </StripeProvider>
  );
}

export default App;