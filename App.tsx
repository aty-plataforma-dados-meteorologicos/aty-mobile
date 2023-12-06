import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import theme from './src/theme';
import React from 'react';
import { Routes } from './src/routes';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'
import { LogBox } from 'react-native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  LogBox.ignoreAllLogs(true);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);
  

  if(!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme = {theme}>
      <StatusBar
        barStyle="default"
        translucent
        backgroundColor="transparent"
      />
      <Routes />
      <Toast />
    </ThemeProvider>
  )
}

export const styles = StyleSheet.create({
  container : {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  component : {
    flex: 1,
    width: '100%'
  } 
})
