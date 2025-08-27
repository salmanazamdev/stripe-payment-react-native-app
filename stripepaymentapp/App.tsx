import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './src/CheckoutScreen';
import SuccessScreen from './src/SuccessScreen';
import { STRIPE_KEYS } from './src/config/keys';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <StripeProvider publishableKey={STRIPE_KEYS.publishableKey}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;