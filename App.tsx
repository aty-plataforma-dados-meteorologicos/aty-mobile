import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Map';
import MapView from 'react-native-maps';
import { styled } from 'styled-components';

export default function App() {
  return (
    // <View
    // style={styles.container}
    // >
    //   {/* <Text>Open up App.tsx to start working on your app!</Text> */}
    //   <Map />
    // </View>
    <Home />
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
