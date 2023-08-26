import MapView, { Marker } from "react-native-maps";
import { Container, MapComp, Pin } from "./styles";
import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location'
import { Text, View, StyleSheet } from "react-native";
import { LoadingModal } from "../../components/Modal Loading";
import React from "react";


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

    useEffect(() => {
        requestUserLocationPermission()
    }, [])

    return(
        <View style={styles.container}>
            <LoadingModal isVisible={isLoading} />
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
    }
})