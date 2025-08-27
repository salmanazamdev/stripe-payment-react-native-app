import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SuccessScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Payment Successful!</Text>
      <Text style={styles.subtitle}>Thank you for your payment</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.buttonText}>Pay Again</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#5469d4',
    padding: 16,
    borderRadius: 8,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;