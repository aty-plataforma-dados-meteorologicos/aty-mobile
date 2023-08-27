import MapView, { Marker } from "react-native-maps";
import { Container, MapComp, Pin } from "./styles";
import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location'
import { Text, View, StyleSheet } from "react-native";
import { LoadingModal } from "../../components/ModalLoading";
import React from "react";
import { HeaderMap } from "../../components/HeaderMap";


export function Home(){

    const [location, setLocation] = useState<LocationObject | null>( null);
    const [isLoading, setIsLoading] = useState(false);

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

    function onMenuPress(){
        console.log('Menu Pressionado')
    }

    function onLocationPress(){
        console.log('Localização Pressionado')
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
                userInterfaceStyle='light'
                // provider="google"
                initialRegion={{
                    latitude: location?.coords.latitude || -15.777874,
                    longitude: location?.coords.longitude || -47.918151,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}
                style={styles.map}
            >
                <Marker
                    coordinate={{
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude
                    }}
                >

                </Marker>
           </MapView>}
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
        left: 0, // alinhado à esquerda
        right: 0, // alinhado à direita
        zIndex: 1, // coloque um zIndex alto para que fique no topo
      },
})