import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';
import { Animated, View, StyleSheet, Dimensions, PanResponder } from "react-native";
import { LoadingModal } from "../../components/ModalLoading";
import { HeaderMap } from "../../components/HeaderMap";
import { StationCardMap } from "../../components/StationCardMap";
import { ModalImage } from "../../components/ModalImage";
import { StationCardSkeleton } from "../../components/StationCardMapSkeleton";
import { useNavigation } from "@react-navigation/native";
import { WeatherStationsService } from "../../services/WeatherStationService";
import WeatherStationData from "src/interfaces/weatherStation/WeatherStationData";
import { DrawerMenu } from "../../components/DrawerMenu";
import { ModalInfoSensor } from "../../components/ModalInfoSensor";
import SensorService from "../../services/SensorService";
import SensorData from "../../interfaces/sensor/SensorData";

export function Home() {
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * 0.7; 
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [weatherStations, setWeatherStations] = useState<any>();
  const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
  const [sensorInformation, setSensorInformation] = useState<SensorData | null>(null);
  const [favoriteStation, setFavoriteStation] = useState<any>();
  const [openPicture, setOpenPicture] = useState(false);
  const [openInfoSensor, setOpenInfoSensor] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>(null);
  const stationCardYPosition = useRef(new Animated.Value(500)).current;
  const drawerPosition = useRef(new Animated.Value(-drawerWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();
  const weatherStationService = new WeatherStationsService();
  const sensorService = new SensorService();

  // Requisição da localização
  async function requestUserLocationPermission() {
    setIsLoading(true);
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setIsLoading(false);
    }
  }

  // Função que leva o mapa para a localização do usuário
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

  // Função que obtem todas as estações
  async function getAllWeatherStation(){
    const response = await weatherStationService.getAllWeatherStationsMap()
    if(response != null){
      setWeatherStations(response)
    }
  }

  // Função que obtem todas as estações favoritas
  async function getAllFavoriteWeatherStation(){
    const response = await weatherStationService.getAllStationFavoritesByUser()
    if(response != null){
      setFavoriteStation(response.data)
    }
  }

  // Função que obtem dados do sensor e abre o modal
  async function getSensorInfo(sensorId : string){
    const response = await sensorService.getSensorById(sensorId);
    if(response){
      setSensorInformation(response);
      setOpenInfoSensor(true);
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
      }).start(() => {
        setOpenPicture(false)
        setOpenInfoSensor(false)
      });
    });
  };

  function teste() {
    console.log('teste');
  }

  function handleMenu() {
    setIsDrawerVisible(true);
    Animated.timing(drawerPosition, {
        toValue: 0, 
        duration: 300, 
        useNativeDriver: true 
    }).start();
}

function closeDrawer() {
  Animated.timing(drawerPosition, {
      toValue: -drawerWidth, 
      duration: 300, 
      useNativeDriver: true 
  }).start(() => setIsDrawerVisible(false)); 
}

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onMoveShouldSetPanResponder: (evt, gestureState) => {
    // Permitir o gesto apenas se estiver se movendo da direita para a esquerda
    return gestureState.dx < 0;
  },
  onPanResponderMove: (evt, gestureState) => {
    if (gestureState.dx < 0) {
      drawerPosition.setValue(gestureState.dx);
    }
  },
  onPanResponderRelease: (e, gestureState) => {
    if (gestureState.dx < -50) {
      closeDrawer();
    } else {
      Animated.spring(drawerPosition, {
        toValue: 0,
        useNativeDriver: true,   // <-- Atualizado para true
      }).start();
    }
  }
});
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
    if (openPicture || openInfoSensor) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [openPicture, openInfoSensor]);

  useEffect(() => {
    requestUserLocationPermission();
    getAllWeatherStation();
    getAllFavoriteWeatherStation()
  }, []);

  useEffect(() => {
    getAllWeatherStation();
    getAllFavoriteWeatherStation()
  }, [openModal]);



  return (
    <View style={styles.container}>
      <LoadingModal isVisible={isLoading} />
      <View style={styles.headerContainer}>
        <HeaderMap onMenuPress={handleMenu} onLocationPress={handleUserLocation} />
      </View>

      {/* Mapa da Aplicação */}
      {location && (
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: location?.coords.latitude || -15.777874,
            longitude: location?.coords.longitude || -47.918151,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          region={mapRegion} 
          showsUserLocation
          onPress={() => {
            setOpenModal(false);
            setWeatherStation(undefined);
            closeDrawer();
          }}
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
                pinColor={station.id === weatherStation?.id ? '#0000ff' : '#ff0000'}
                key={station.id}
              />
            ))
          }
        </MapView>
      )}
      
      {/* Card da estação */}
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
            isFavorite={favoriteStation ? favoriteStation.some((station : any )=> station.id === weatherStation.id) : false}
            onPressButton={teste}
            onPressImage={() => setOpenPicture(true)}
            onPressInfo={(sensorId) => getSensorInfo(sensorId)}
            onPressFavorite={handleFavorite}
          />

          
        ) : (
          <StationCardSkeleton />
        )}
      </Animated.View>

      {/* Card da visualização da foto */}
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
            imageUri={weatherStation?.image || "" }
            />
        </Animated.View>
      )}

      {/* Card da visualização das info do sensor */}
      {openInfoSensor && sensorInformation && (
          <Animated.View
            style={[
              styles.modalStyle,
              {
                opacity: fadeAnim,
              }
            ]}
          >
              <ModalInfoSensor onClose={(event) => {
                event.stopPropagation();
                requestAnimationFrame(() => {
                    fadeOut()
                  })
                }} 
                sensorInfo={sensorInformation}
              />
          </Animated.View>
        )}

      

      {/* Menu lateral */}
      {isDrawerVisible && (
        <Animated.View 
          {...panResponder.panHandlers}
          style={[
              {
                  transform: [{ translateX: drawerPosition }],
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: drawerWidth,
                  zIndex: 4,
              }
          ]}
        >
            <DrawerMenu />
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