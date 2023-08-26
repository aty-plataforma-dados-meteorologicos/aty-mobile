import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home/index';
import MapView from 'react-native-maps';
import { ThemeProvider } from 'styled-components/native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import theme from './src/theme';
import React from 'react';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
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
      <Home />
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
