import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { API_BASE_URL } from './config/keys';

const CheckoutScreen = ({ navigation }: { navigation: any }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Setup payment sheet
  const setupPaymentSheet = async () => {
    try {
      // Call your backend
      const response = await fetch(`${API_BASE_URL}/payment-sheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2000 }), // $20.00
      });

      const { paymentIntent, ephemeralKey, customer } = await response.json();

      // Initialize payment sheet
      const { error } = await initPaymentSheet({
        merchantDisplayName: 'My Business',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
      });

      if (!error) {
        setReady(true);
      } else {
        Alert.alert('Setup Error', error.message);
      }
    } catch (error) {
      Alert.alert('Setup Failed', 'Could not setup payment');
    }
  };

  // Handle payment
  const handlePayment = async () => {
    setLoading(true);

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Payment Failed', error.message);
    } else {
      // Payment successful!
      navigation.navigate('Success');
    }

    setLoading(false);
  };

  useEffect(() => {
    setupPaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stripe Payment Test</Text>
      <Text style={styles.amount}>Amount: $20.00</Text>

      <TouchableOpacity
        style={[styles.button, (!ready || loading) && styles.disabled]}
        onPress={handlePayment}
        disabled={!ready || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {ready ? 'Pay Now' : 'Setting up...'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.testInfo}>
        <Text style={styles.testTitle}>Test Card:</Text>
        <Text>4242 4242 4242 4242</Text>
        <Text>Any future date, any CVC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#5469d4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  testTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CheckoutScreen;