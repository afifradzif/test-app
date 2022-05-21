import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { PrimaryButton } from './src/components/MainComponent';
import Connection from './src/connectivity/Connection';
import MainScreen from './src/screens/MainScreen'

export default function App() {

  return (
    <View style={styles.container}>
    <MainScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    //marginLeft: 20
  },
});
