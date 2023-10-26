import React from "react";
import { Header, ModalView, Title } from "./styles";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

type Props = {
    latitude: any;
    longitude: any;
    altura: any;
}

export function MapInformation({ latitude, longitude, altura } : Props){

    return (
            <ModalView>
                <Header>
                    <Title>{latitude} / {longitude} / {altura} metros</Title>
                </Header>
                {latitude && longitude && (
                    <MapView
                    provider="google"
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.3
                    }}
                    style={styles.map}
                    >
                        <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                          }}
                        />

                    
                    </MapView>
                )}
                
            </ModalView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121214',
    },
    map: {
      flex: 1,
      width: '100%',
      borderRadius: 30,
    }
});