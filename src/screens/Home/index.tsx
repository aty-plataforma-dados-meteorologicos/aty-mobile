import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';
import { Animated, View, StyleSheet } from "react-native";
import { LoadingModal } from "../../components/ModalLoading";
import { HeaderMap } from "../../components/HeaderMap";
import { StationCardMap } from "../../components/StationCardMap";

export function Home() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const stationCardYPosition = useRef(new Animated.Value(500)).current;

  async function requestUserLocationPermission() {
    setIsLoading(true);
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setIsLoading(false);
    }
  }

  const animateCard = () => {
    Animated.timing(stationCardYPosition, {
      toValue: openModal ? 0 : 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!openModal) {
        setIsCardVisible(false);
      }
    });
  };

  function teste(){
    console.log(teste)
  }

  useEffect(() => {
    if (openModal) {
      setIsCardVisible(true);
    }
    animateCard();
  }, [openModal]);

  useEffect(() => {
    requestUserLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <LoadingModal isVisible={isLoading} />
      <View style={styles.headerContainer}>
        <HeaderMap onMenuPress={teste} onLocationPress={teste}/>
      </View>
      {location && (
        <MapView
          initialRegion={{
            latitude: location?.coords.latitude || -15.777874,
            longitude: location?.coords.longitude || -47.918151,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          showsUserLocation
          onPress={() => setOpenModal(false)}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            }}
            onPress={(event) => {
              event.stopPropagation();
              setOpenModal(true);
            }}
          ></Marker>
        </MapView>
      )}
      <Animated.View
        style={[
          styles.stationCardContainer,
          {
            transform: [{ translateY: stationCardYPosition }],
          },
        ]}
      >
        {isCardVisible && <StationCardMap />}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 1,
    right: 1,
    zIndex: 1,
  },
  stationCardContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 2,
    alignItems: "center"
  },
});
