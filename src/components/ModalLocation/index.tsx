import React, { useState } from "react";
import { CloseButton, Container, Header, ModalView, Title } from "./styles";
import MapView from "react-native-maps";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    showModal: boolean;
    // onSubmit: (data : PartnerData) => void;
    onCloseModal: () => void
}

export function ModalLocation({ showModal, onCloseModal } : Props){

    const [location, setLocation] = useState<LocationObject | null>(null);

    async function requestUserLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
          const currentPosition = await getCurrentPositionAsync();
          setLocation(currentPosition);
        }
      }

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
                >
                </MapView>
            </ModalView>
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