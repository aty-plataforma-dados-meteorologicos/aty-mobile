import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';
import { Animated, View, StyleSheet } from "react-native";
import { LoadingModal } from "../../components/ModalLoading";
import { HeaderMap } from "../../components/HeaderMap";
import { StationCardMap } from "../../components/StationCardMap";
import data from "../../data/weatherstations.json"
import { ModalImage } from "../../components/ModalImage";
import { StationCardSkeleton } from "../../components/StationCardMapSkeleton";
import { useNavigation } from "@react-navigation/native";
import { WeatherStationsService } from "../../services/WeatherStationService";
import WeatherStationData from "src/interfaces/weatherStation/WeatherStationData";

export function Home() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [weatherStations, setWeatherStations] = useState<any>();
  const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
  const [favoriteStation, setFavoriteStation] = useState<any>();
  const [openPicture, setOpenPicture] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>(null);


  const stationCardYPosition = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation()
  const weatherStationService = new WeatherStationsService()


  async function requestUserLocationPermission() {
    setIsLoading(true);
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setIsLoading(false);
    }
  }

  function handleUserLocation() {
    if (location) {
      const { latitude, longitude } = location.coords;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setMapRegion(region);
      mapRef.current?.animateToRegion(region, 500);  // 500ms para a animação
    }
  };

  async function getAllWeatherStation(){
    const response = await weatherStationService.getAllWeatherStationsMap()
    const response2 = await weatherStationService.getAllStationFavoritesByUser()
    if(response != null){
      setWeatherStations(response)
      console.log(response)
    }
  }

  async function getAllFavoriteWeatherStation(){
    const response = await weatherStationService.getAllStationFavoritesByUser()
    if(response != null){
      setFavoriteStation(response.data)
    }
  }
  

  const animateCard = () => {
    requestAnimationFrame(() => {
      Animated.timing(stationCardYPosition, {
        toValue: openModal ? 0 : 500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (!openModal) {
          setIsCardVisible(false);
        }
      });
    });
  };

  const fadeIn = () => {
    requestAnimationFrame(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const fadeOut = () => {
    requestAnimationFrame(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setOpenPicture(false));
    });
  };

  function teste() {
    console.log('teste');
  }

  function handleMenu(){
    (navigation as any).openDrawer()
  }

  function handleFavorite(){
    console.log("Teste")
  };
  

  useEffect(() => {
    if (openModal) {
      setIsCardVisible(true);
    }
    animateCard();
  }, [openModal]);

  useEffect(() => {
    if (openPicture) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [openPicture]);

  useEffect(() => {
    requestUserLocationPermission();
    getAllWeatherStation();
    getAllFavoriteWeatherStation()
  }, []);

  return (
    <View style={styles.container}>
      <LoadingModal isVisible={isLoading} />
      <View style={styles.headerContainer}>
        <HeaderMap onMenuPress={handleMenu} onLocationPress={handleUserLocation} />
      </View>
      {location && (
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: location?.coords.latitude || -15.777874,
            longitude: location?.coords.longitude || -47.918151,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          region={mapRegion} 
          showsUserLocation
          onPress={() => setOpenModal(false)}
          style={styles.map}
        >
          {weatherStations &&
            weatherStations.map((station: WeatherStationData) => (
              <Marker 
                coordinate={{
                  latitude: parseFloat(station.latitude) ,
                  longitude: parseFloat(station.longitude),
                }}
                onPress={(event) => {
                  event.stopPropagation();
                  setWeatherStation(station);
                  setOpenModal(true);
                }}
                pinColor={openModal ? 'yelow' : 'red'}
                key={station.id}
              />
            ))
          }
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
      {isCardVisible && weatherStation ?  (
        <StationCardMap 
          title={weatherStation.name}
          stationType={weatherStation.isPrivate ? "Estação Privada" : "Estação Pública"}
          titleButton={weatherStation.isPrivate ? weatherStation.acessValid ? "Acessar Estação" : "Solicitar Acesso" : "Acessar Estação"}
          sensors={weatherStation.sensors}
          imageUri={weatherStation.image}
          showFavorite={weatherStation.isPrivate ? false : true}
          isFavorite={favoriteStation.some((station : any )=> station.id === weatherStation.id)}
          onPressButton={teste}
          onPressImage={() => setOpenPicture(true)}
          onPressInfo={teste}
          onPressFavorite={handleFavorite}
        />

        
      ) : (
        <StationCardSkeleton />
      )}
    </Animated.View>
      {openPicture && (
        <Animated.View
          style={[
            styles.modalStyle,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <ModalImage onClose={(event) => {
            event.stopPropagation();
            requestAnimationFrame(() => {
              fadeOut();
              });
            }} 
            imageUri={weatherStation.image ? weatherStation.image : null }
            />
        </Animated.View>
      )}
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
  modalStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
});
