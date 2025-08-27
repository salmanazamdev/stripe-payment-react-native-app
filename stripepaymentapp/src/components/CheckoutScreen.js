

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const API_URL = 'http://192.168.100.15:3000'; // Android emulator

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Initializing...');

  const fetchPaymentSheetParams = async () => {
    try {
      console.log('🔵 Fetching payment sheet params...');
      setStatus('Fetching from server...');
      
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Got response:', data);
      setStatus('Server response received');
      
      return {
        paymentIntent: data.paymentIntent,
        ephemeralKey: data.ephemeralKey,
        customer: data.customer,
      };
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setStatus(`Error: ${error.message}`);
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      setStatus('Getting payment data...');
      
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();

      console.log('🔵 Initializing payment sheet...');
      setStatus('Initializing payment sheet...');

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      
      if (error) {
        console.error('❌ Payment sheet init error:', error);
        setStatus(`Init error: ${error.message}`);
        Alert.alert('Payment Sheet Error', error.message);
      } else {
        console.log('✅ Payment sheet initialized successfully');
        setStatus('Ready to pay!');
        setLoading(true);
      }
    } catch (error) {
      console.error('❌ Initialize error:', error);
      setStatus(`Failed: ${error.message}`);
      Alert.alert('Initialization Failed', error.message);
    }
  };

  const openPaymentSheet = async () => {
    console.log('🔵 Opening payment sheet...');
    const { error } = await presentPaymentSheet();

    if (error) {
      console.error('❌ Payment error:', error);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      console.log('✅ Payment successful!');
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stripe Payment Sheet Demo</Text>
      <Text style={styles.amount}>Amount: €10.99</Text>
      
      {/* Status indicator */}
      <Text style={styles.status}>Status: {status}</Text>
      
      <TouchableOpacity
        style={[styles.button, !loading && styles.disabled]}
        disabled={!loading}
        onPress={openPaymentSheet}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Checkout' : 'Loading...'}
        </Text>
      </TouchableOpacity>

      {/* Debug button to retry */}
      <TouchableOpacity
        style={styles.retryButton}
        onPress={initializePaymentSheet}
      >
        <Text style={styles.retryButtonText}>Retry Setup</Text>
      </TouchableOpacity>

      <View style={styles.testCard}>
        <Text style={styles.testTitle}>Test Card:</Text>
        <Text>4242 4242 4242 4242</Text>
        <Text>Any future expiry, any CVC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  status: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5469d4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  testCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  testTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});