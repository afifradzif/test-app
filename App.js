import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainScreen from './src/screens/MainScreen'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
