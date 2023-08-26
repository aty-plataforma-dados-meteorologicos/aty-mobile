import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Map';
import MapView from 'react-native-maps';
import { ThemeProvider, styled } from 'styled-components';
import { useEffect } from 'react';
import * as Font from 'expo-font';
import theme from './src/theme';

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      });
    };

    loadFonts();
  }, []);

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

export const Map = styled(Home).attrs(() => ({
    
}))`
    flex: 1;
    width: '100%'
`

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
