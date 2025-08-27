import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { API_BASE_URL } from '../config/keys';

const CheckoutScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(2000); // $20.00

  const amounts = [
    { label: 'Basic Plan', value: 999, description: '$9.99/month' },
    { label: 'Premium Plan', value: 1999, description: '$19.99/month' },
    { label: 'Pro Plan', value: 2999, description: '$29.99/month' },
  ];

  // Fetch payment sheet parameters from backend
  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedAmount,
          currency: 'usd',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch payment parameters');
      }

      return data;
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      throw error;
    }
  };

  // Initialize payment sheet
  const initializePaymentSheet = async () => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Your Business Name",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Test Customer',
          email: 'customer@example.com',
        },
        returnURL: 'stripepaymentapp://stripe-redirect',
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setReady(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize payment sheet');
      console.error('Payment sheet initialization error:', error);
    }
  };

  // Present payment sheet
  const openPaymentSheet = async () => {
    if (!ready) {
      return;
    }

    setLoading(true);

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // Payment completed successfully
      navigation.navigate('Success', { 
        amount: selectedAmount,
        method: 'Payment Sheet'
      });
    }

    setLoading(false);
  };

  // Initialize payment sheet when component mounts or amount changes
  useEffect(() => {
    initializePaymentSheet();
  }, [selectedAmount]);

  const formatAmount = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      
      {/* Plan Selection */}
      <View style={styles.plansContainer}>
        {amounts.map((plan) => (
          <TouchableOpacity
            key={plan.value}
            style={[
              styles.planCard,
              selectedAmount === plan.value && styles.selectedPlan
            ]}
            onPress={() => setSelectedAmount(plan.value)}
          >
            <Text style={[
              styles.planLabel,
              selectedAmount === plan.value && styles.selectedPlanText
            ]}>
              {plan.label}
            </Text>
            <Text style={[
              styles.planDescription,
              selectedAmount === plan.value && styles.selectedPlanText
            ]}>
              {plan.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Sheet Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>🔒 Secure Payment</Text>
        <Text style={styles.infoText}>
          Your payment is processed securely by Stripe. We support cards, 
          Apple Pay, Google Pay, and other payment methods.
        </Text>
      </View>

      {/* Test Card Information */}
      <View style={styles.testCardContainer}>
        <Text style={styles.testCardTitle}>💳 Test Cards</Text>
        <Text style={styles.testCardText}>• 4242 4242 4242 4242 (Success)</Text>
        <Text style={styles.testCardText}>• 4000 0000 0000 0002 (Decline)</Text>
        <Text style={styles.testCardText}>• Use any future expiry & CVC</Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity
        style={[styles.checkoutButton, !ready && styles.disabledButton]}
        onPress={openPaymentSheet}
        disabled={!ready || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.checkoutButtonText}>
            {ready ? `Pay ${formatAmount(selectedAmount)}` : 'Loading...'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Payment Sheet Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Payment Sheet Status: {ready ? '✅ Ready' : '⏳ Loading...'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1a1a1a',
  },
  plansContainer: {
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: '#635BFF',
    backgroundColor: '#f8f7ff',
  },
  planLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 16,
    color: '#6b7280',
  },
  selectedPlanText: {
    color: '#635BFF',
  },
  infoContainer: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#065f46',
    lineHeight: 20,
  },
  testCardContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 30,
  },
  testCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  testCardText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 2,
  },
  checkoutButton: {
    backgroundColor: '#635BFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#635BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default CheckoutScreen;