import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './src/components/CheckoutScreen';
import SuccessScreen from './src/components/SuccessScreen';

const Stack = createStackNavigator();

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  // Fetch publishable key from your server
  const fetchPublishableKey = async () => {
    // In production, fetch this from your server
    // For now, we'll use the hardcoded key
    setPublishableKey('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  if (!publishableKey) {
    return null; // Loading state
  }

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.stripepaymentapp"
      urlScheme="stripepaymentapp"
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Checkout">
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
            options={{ title: 'Checkout' }}
          />
          <Stack.Screen 
            name="Success" 
            component={SuccessScreen}
            options={{ title: 'Payment Success', headerLeft: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;