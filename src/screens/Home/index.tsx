import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location';
import { Animated, View, StyleSheet, Dimensions, PanResponder, SafeAreaView } from "react-native";
import { LoadingModal } from "../../components/ModalLoading";
import { HeaderMap } from "../../components/HeaderMap";
import { StationCardMap } from "../../components/StationCardMap";
import { ModalImage } from "../../components/ModalImage";
import { StationCardSkeleton } from "../../components/StationCardMapSkeleton";
import { useNavigation } from "@react-navigation/native";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { DrawerMenu } from "../../components/DrawerMenu";
import { ModalInfoSensor } from "../../components/ModalInfoSensor";
import SensorService from "../../services/SensorService";
import SensorData from "../../interfaces/sensor/SensorData";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { StackType } from "../../interfaces/routes/routs";

export function Home() {
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * 0.7; 
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [weatherStations, setWeatherStations] = useState<any>();
  const [weatherStationsWhithAcess, setWeatherStationsWhithAcess] = useState<any>();
  const [weatherStationsWhithAcessPendent, setWeatherStationsWhithAcessPendent] = useState<any>();
  const [isButtonCardLoading, setIsButtonCardLoading] = useState<boolean>(false);
  const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
  const [weatherStationPhoto, setWeatherStationPhoto] = useState<String>()
  const [sensorInformation, setSensorInformation] = useState<SensorData | null>(null);
  const [favoriteStation, setFavoriteStation] = useState<any>();
  const [openPicture, setOpenPicture] = useState(false);
  const [openInfoSensor, setOpenInfoSensor] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>(null);
  const stationCardYPosition = useRef(new Animated.Value(500)).current;
  const drawerPosition = useRef(new Animated.Value(-drawerWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation<StackType>();
  const weatherStationService = new WeatherStationsService();
  const sensorService = new SensorService();

  async function requestUserLocationPermission() {
    setIsLoading(true);
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setIsLoading(false);
    } else {
      setIsLoading(false)
    }
  }

  async function getAllWeatherStation(){
    const response = await weatherStationService.getAllWeatherStationsMap()
    if(response != null){
      setWeatherStations(response)
    }
  }

  async function getAllFavoriteWeatherStation(){
    const response = await weatherStationService.getAllStationFavoritesByUser()
    if(response != null){
      setFavoriteStation(response.data)
    }
  }

  async function getAcessStation(){
    try {
        const response = await weatherStationService.getAllAcessStation();

        if (response) {
            setWeatherStationsWhithAcess(response.data);
        }

    } catch (error) {
        console.log("Erro")
    }
  }

  async function getAcessStationPendent(){
    try {
        const response = await weatherStationService.getAllStationWithAcessPendent();
        if (response) {
            setWeatherStationsWhithAcessPendent(response.data);
        }

    } catch (error) {
      console.log("Erro")
    }
  }

  async function getWeatherStationPhoto(stationid : string){
    const response = await weatherStationService.getWeatherStationPhoto(stationid)
    if(response){
      setWeatherStationPhoto(response)
    }
  }

  async function getSensorInfo(sensorId : string){
    const response = await sensorService.getSensorById(sensorId);
    if(response){
      setSensorInformation(response);
      setOpenInfoSensor(true);
    }
  }

  async function handleFavorite(weatherStation: WeatherStationData) {
    let isFavorite = false;
    if (favoriteStation && Array.isArray(favoriteStation)) {
        isFavorite = favoriteStation.some((station: WeatherStationData) => station.id === weatherStation.id);
    }

    try {
        if (isFavorite) {
            const response = await weatherStationService.removeWeatherStationFavorite(weatherStation);
            if (response) {
                getAllFavoriteWeatherStation()
            }
        } else {
            // Se não está na lista, adicione
            const response = await weatherStationService.addWeatherStationFavorite(weatherStation);
            if (response) {
                getAllFavoriteWeatherStation()
            }
        }
    } catch (error) {
        console.error("Erro ao processar a estação favorita:", error);
    }
  }

  // Função de decisão para o botão do card da estação
  async function handleButtonStationCard(weatherStationObject : WeatherStationData) {
    if (!weatherStationObject.isPrivate) {
      handleGoToStation(weatherStationObject.id || '1');
    } else {
      const hasAccess = weatherStationsWhithAcess?.some(station => station.id == weatherStationObject.id) || false;
      const isAccessPending = weatherStationsWhithAcessPendent?.some(station => station.id == weatherStationObject.id) || false;
  
      if (hasAccess) {
        handleGoToStation(weatherStationObject.id || '1');
      } else if (!isAccessPending) {
        setIsButtonCardLoading(true);
        try {
          const response = await weatherStationService.RequestAcessToTheWeatherStation(weatherStationObject.id);
          if(response){
            await getAcessStation();
            await getAcessStationPendent();
          }
          console.log("Pedido de acesso", response)
          
        } catch (error) {
          console.error("Erro ao solicitar acesso à estação:", error);
        }
        setIsButtonCardLoading(false);
      }
    }
  }

  function determineTitleButton(weatherStationObject : WeatherStationData){
    if (weatherStationObject.isPrivate) {
      if (weatherStationsWhithAcess && weatherStationsWhithAcess.some(station => station.id == weatherStationObject.id)) {
        return "Acessar Estação";
      } else if (weatherStationsWhithAcessPendent && weatherStationsWhithAcessPendent.some(station => station.id == weatherStationObject.id)) {
        return "Acesso Solicitado";
      } else {
        return "Solicitar Acesso";
      }
    } else {
      return "Acessar Estação";
    }
  }

  function handleGoToStation(stationId: string) {
    navigation.navigate('Station', { stationId: stationId })
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
      mapRef.current?.animateToRegion(region, 500);
    }
  };

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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
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
          useNativeDriver: true,
        }).start();
      }
    }
  });

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
    getAllFavoriteWeatherStation();
    getAcessStation()
    getAcessStationPendent()
  }, []);

  useEffect(() => {
    getAllWeatherStation();
    getAllFavoriteWeatherStation();
    getAcessStation()
    getAcessStationPendent()
  }, [openModal]);

  // useEffect(() => {
  //   const fetchData = () => {
  //       getAllWeatherStation();
  //       getAllFavoriteWeatherStation();
  //       getAcessStation();
  //       getAcessStationPendent();
  //   };

  //   fetchData();

  //   const intervalId = setInterval(fetchData, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <View style={styles.container}>
      <LoadingModal isVisible={isLoading} />
      <View style={styles.headerContainer}>
        <HeaderMap onMenuPress={handleMenu} onLocationPress={handleUserLocation} />
      </View>

      {/* Mapa da Aplicação */}
      {location && (
        <MapView
          provider="google"
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
            setWeatherStationPhoto(undefined)
            closeDrawer();
          }}
          style={styles.map}
        >
          {weatherStations && weatherStations.length > 0 &&
            weatherStations.map((station: WeatherStationData) => (
              <Marker 
                coordinate={{
                  latitude: parseFloat(station?.latitude || '0'),
                  longitude: parseFloat(station?.longitude || '0'),
                }}
                onPress={(event) => {
                  event.stopPropagation();
                  setOpenModal(true);
                  getWeatherStationPhoto(station?.id || '0ss')
                  setWeatherStation(station);
                }}
                pinColor={station.id === weatherStation?.id ? "#0000FF" : "#FF0000"}
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
            title={weatherStation.name || "Estação Meteorológica"}
            stationType={weatherStation.isPrivate ? "Estação Privada" : "Estação Pública"}
            titleButton={determineTitleButton(weatherStation)}
            sensors={weatherStation.sensors}
            imageUri={weatherStationPhoto}
            showFavorite={weatherStation.isPrivate ? false : true}
            isFavorite={favoriteStation ? favoriteStation.some((station : any )=> station.id == weatherStation.id) : false}
            onPressButton={() => handleButtonStationCard(weatherStation)}
            onPressImage={() => setOpenPicture(true)}
            onPressInfo={(sensorId) => getSensorInfo(sensorId)}
            onPressFavorite={() => handleFavorite(weatherStation)}
            isLoading={isButtonCardLoading}
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
          <ModalImage 
          imageUri={weatherStationPhoto}
          onClose={(event) => {
            event.stopPropagation();
            requestAnimationFrame(() => {
              fadeOut();
              });
            }}
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