import React, { useEffect, useState } from "react";
import { BodyModalContent, CloseButton, Container, Header, ModalView, Title } from "./styles";
import MapView, { Marker } from "react-native-maps";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

type Props = {
    showModal: boolean;
    onSubmit: (data : any) => void;
    onCloseModal: () => void
}

type LocationPointType = {
    coordinate: {
      latitude: number;
      longitude: number;
    };
    position: {
      x: number;
      y: number;
    };
};

type SubmitLocationType = {
    latitude: number;
    longitude: number;
    altitude: number;
};


export function ModalLocation({ showModal, onCloseModal, onSubmit } : Props){

    const [location, setLocation] = useState<LocationObject | null>(null);
    const [locationPoint, setlocationPoint] = useState<LocationPointType | null>(null);

    async function requestUserLocationPermission() {
          const currentPosition = await getCurrentPositionAsync();
          setLocation(currentPosition);
    }

    function handleSubmit(data : any){
        let submitData: SubmitLocationType = {
            latitude: 0,
            longitude: 0,
            altitude: 0
        };
    
        // Se a localização do marcador está sendo enviada
        if(data.coordinate) {
            submitData = {
                latitude: data.coordinate.latitude,
                longitude: data.coordinate.longitude,
                altitude: 0 // Altitude não está disponível para a localização do marcador, então setamos como 0 ou qualquer valor padrão.
            };
        } 
        // Se a localização atual do usuário está sendo enviada
        else if(data.coords) {
            submitData = {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                altitude: data.coords.altitude
            };
        }
    
        onSubmit(submitData);
        setlocationPoint(null);
    }
    

    useEffect(() => {
        requestUserLocationPermission()
    }
    , [])

    return (
        <Container
            animationType="slide"
            visible={showModal}
            transparent={true}
        >
            <ModalView>
                <Header>
                    <Title>Adicionar Localização</Title>
                    <CloseButton onPress={onCloseModal}>
                        <FontAwesomeIcon icon={faXmark} color="#FFFFFF" size={30} />
                    </CloseButton>
                </Header>
                <MapView
                    provider="google"
                    initialRegion={{
                        latitude: location?.coords.latitude || -15.777874,
                        longitude: location?.coords.longitude || -47.918151,
                        latitudeDelta: 30,
                        longitudeDelta: 30,
                    }}
                    showsUserLocation
                    style={styles.map}
                    onMarkerPress={() => console.log("marker")}
                    onPoiClick={() => console.log("poin")}
                    onPress={(event) => setlocationPoint({ coordinate: event.nativeEvent.coordinate, position: event.nativeEvent.position })}
                >
                    { locationPoint &&
                        <Marker
                        coordinate={{
                            latitude: locationPoint.coordinate.latitude,
                            longitude: locationPoint.coordinate.longitude,
                          }}
                        />
                    }

                    
                </MapView>
            </ModalView>
            <BodyModalContent>
                { locationPoint && 
                    <Button title="Usar localização do marcador" onPress={() => handleSubmit(locationPoint)} color="PRIMARY" />
                }
                { location && 
                    <Button title="Usar localização atual" onPress={() => handleSubmit(location)} color="PRIMARY" />
                }  
            </BodyModalContent>
        </Container>
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