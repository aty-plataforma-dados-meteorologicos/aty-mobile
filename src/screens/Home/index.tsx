import MapView, { Marker } from "react-native-maps";
import { Container, MapComp, Pin } from "./styles";
import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location'
import { Text, View, StyleSheet, Animated } from "react-native";
import { LoadingModal } from "../../components/ModalLoading";
import React from "react";
import { HeaderMap } from "../../components/HeaderMap";
import { StationCardMap } from "../../components/StationCardMap";


export function Home(){

    const [location, setLocation] = useState<LocationObject | null>( null);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

    const toggleLoading = () => {
        setIsLoading(!isLoading);
    };

    async function requestUserLocationPermission(){
        setIsLoading(true)
        const { granted } = await requestForegroundPermissionsAsync()

        if(granted){
            
            const currentPosition = await getCurrentPositionAsync()
            console.log(currentPosition)
            setLocation(currentPosition)
            setIsLoading(false)
        }
    }

    const cardPosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '5%'] // posição inicial e final do card
      });
      
      const animatedStyle = {
        bottom: cardPosition  // isto move o card verticalmente
      };

      useEffect(() => {
        Animated.timing(animatedValue, {
          toValue: openModal ? 1 : 0,  // 1 se o modal estiver aberto, 0 se estiver fechado
          duration: 500,  // duração da animação em ms
          useNativeDriver: false  // troque para true se você não estiver animando propriedades que não podem ser nativas
        }).start();
      }, [openModal]);

    function onMenuPress(){
        console.log('Menu Pressionado')
    }

    function onLocationPress(){
        console.log('Localização Pressionado')
    }

    function onMapPress(teste : any){
        setOpenModal(false)
    }

    useEffect(() => {
        requestUserLocationPermission()
    }, [])

    return(
        <View style={styles.container}>
            <LoadingModal isVisible={isLoading} />
            <View style={styles.headerContainer}>
                <HeaderMap onMenuPress={onMenuPress} onLocationPress={onLocationPress} />
            </View>
            {location &&
            <MapView
                userInterfaceStyle='dark'
                // provider="google"
                initialRegion={{
                    latitude: location?.coords.latitude || -15.777874,
                    longitude: location?.coords.longitude || -47.918151,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}
                showsUserLocation
                onPress={() => setOpenModal(false)}
                style={styles.map}
            >
                <Marker
                    coordinate={{
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude
                    }}
                    onPress={(event) => {
                        event.stopPropagation();
                        setOpenModal(true);
                    }}
                >

                </Marker>
           </MapView>}

            {openModal &&
                <Animated.View style={[styles.stationCardContainer, animatedStyle]}>
                    <StationCardMap />
                </Animated.View>
            }
           </View>
    )
}

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#121214'
    },
    map : {
        flex: 1,
        width: '100%'
    },
    headerContainer: {
        position: 'absolute', // posição absoluta
        top: 0, // alinhado ao topo
        left: 1, // alinhado à esquerda
        right: 1, // alinhado à direita
        zIndex: 1, // coloque um zIndex alto para que fique no topo
      },
      stationCardContainer: {
        position: 'absolute',  // posicionamento absoluto
        bottom: 10, 
        left: 5,
        right: 0,
        zIndex: 2,
      },
})