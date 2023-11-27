import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { ButtonMap, ButtonPublicPrivate, ButtonText, Container, ContainerButtons, ContainerModalSensor, ContainerPublicPrivate, FormContainer, Image, LocationContainer, NoPartner, PartnerHeader, SensorPartnerContainer, TitlePartnerSensorContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SensorService from "../../services/SensorService";
import { Alert, ScrollView, View } from "react-native";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import SensorData from "../../interfaces/sensor/SensorData";
import { InputLocation } from "../../components/InputLocation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackType } from "../../interfaces/routes/routs";
import { ModalPartners } from "../../components/ModalPartners";
import PartnerData from "../../interfaces/partner/PartnerData";
import { ModalInfoSensor } from "../../components/ModalSensor";
import { ModalLocation } from "../../components/ModalLocation";
import { ModalImagePicker } from "../../components/ModalImagePicker";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import Toast from 'react-native-toast-message'

export function RegisterStation(){
    const initialWeatherStation: WeatherStationData = {
        name: '',
        latitude: '',
        longitude: '',
        altitudeMSL: '',
        partners: [],
        photoBase64: '',
        sensors: [],
        isPrivate: false
    };
    const [sensor, setSensor] = useState<SensorData>({
        measurementType: 0, 
        id: 0,              
        name: '',           
        measurementUnit: '',
        minimum: 0,         
        maximum: 0,         
        accuracy: 0,        
        isEnabled: false
    });
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>(initialWeatherStation);
    const [sensors, setSensors] = useState<SensorData[]>();
    const [showModal, setShowModal] = useState(false);
    const [showModalSensor, setShowModalSensor] = useState(false);
    const [showModalLocation, setShowModalLocation] = useState(false);
    const [showModalImage, setShowModalImage] = useState(false);
    const [partner, setPartner] = useState<PartnerData>();
    const [editingPartnerIndex, setEditingPartnerIndex] = useState<number | null>(null);
    const serviceSensor = new SensorService();
    const serviceWeatherStation = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAllSensors(){
        const response = await serviceSensor.getAllSensors();
        setSensors(response.data)
    }

    function handleBack(){
        navigate.navigate('Home')
    }

    function handlePressCheck(sensor: SensorData) {
        const index = weatherStation.sensors.findIndex((s : any) => s.id === sensor.id);
      
        if (index === -1) {
          setWeatherStation((prevState : any) => ({
            ...prevState,
            sensors: [...prevState.sensors, sensor]
          }));
        } else {
          setWeatherStation((prevState : any) => {
            const newSensors = [...prevState.sensors];
            newSensors.splice(index, 1);
            return {
              ...prevState,
              sensors: newSensors
            };
          });
        }
    }
      
    function handleSubmitPartner(data: PartnerData) {
        setWeatherStation((prevState : any) => {
            if (editingPartnerIndex !== null) {
                const updatedPartners = [...prevState.partners];
                updatedPartners[editingPartnerIndex] = data;
                return {
                    ...prevState,
                    partners: updatedPartners
                };
            } else {
                return {
                    ...prevState,
                    partners: [...prevState.partners, data]
                };
            }
        });
        setShowModal(false);
        setPartner(undefined);
        setEditingPartnerIndex(null);
    }    

    function handleEditPartner(data: PartnerData, index: number) {
        setPartner(data);
        setEditingPartnerIndex(index);
        setShowModal(true);
    }
    

    function handleDeletePartner(index: number) {
        const updatedPartners = [...weatherStation.partners];
        updatedPartners.splice(index, 1);
        setWeatherStation((prevState : any) => {
            return {
                ...prevState,
                partners: updatedPartners
            };
        });
    }

    function handleOpenModalSensor(sensor : SensorData){
        setSensor(sensor);
        setShowModalSensor(true)
    }

    function isWeatherStationValid(station : WeatherStationData) {
        if (!station.name) return false;
        if (!station.latitude) return false;
        if (!station.longitude) return false;
        if (!station.altitudeMSL) return false;
        if (!station.sensors || station.sensors.length === 0) return false;
        return true;
    }

    async function RegisterStation(station : WeatherStationData) {
        const isValid = isWeatherStationValid(station);
        console.log(weatherStation)

        if(isValid){
            try {
                const response = await serviceWeatherStation.createWeatherStation(station)
                if(response){
                    Toast.show({
                        type: 'success',
                        text1: 'Estação criada com sucesso',
                        position: 'bottom',
                        bottomOffset: 60
                    })

                    navigate.reset({
                        index: 0,
                        routes: [{name: 'MantainerStations'}]
                    })
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert("Atenção", "Os campos Nome, Latitude, Longitude, Altitude a nível do mar e Sensores devem ser preenchidos.");
        }
    }

    function chunkArray(myArray : any, chunk_size : any){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            let chunk = myArray.slice(index, index+chunk_size);
            tempArray.push(chunk);
        }
    
        return tempArray;
    }
      

    useEffect(() => {
        getAllSensors();
    }, []);

    return(
        <Container>
            <HeaderApp title="Cadastrar Estação" onMenuPress={handleBack}/>
            <ScrollView>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FormContainer>
                    <Input 
                        titleInput="Nome da Estação" 
                        placeholder="Insira o nome da estação"
                        onChangeText={(text) => setWeatherStation((prev : any) => ({ ...prev, name: text }))}
                    />

                    <LocationContainer>
                        <InputLocation 
                            titleInput="Latitude"
                            placeholder="Insira a Latitude"
                            value={weatherStation.latitude}
                            onChangeText={(text) => setWeatherStation((prev : any) => ({ ...prev, latitude: text }))}
                        />
                        <InputLocation 
                            titleInput="Longitude"
                            placeholder="Insira a Longitude"
                            value={weatherStation.longitude}
                            onChangeText={(text) => setWeatherStation((prev : any) => ({ ...prev, longitude: text }))}
                        />
                        <ButtonMap onPress={() => setShowModalLocation(true)}>
                            <FontAwesomeIcon icon={faLocationDot} color="#000000" size={40}/>
                        </ButtonMap>
                    </LocationContainer>

                    <Input 
                        titleInput="Altura a nivel do mar" 
                        placeholder="Insira altura a nivel do mar"
                        keyboardType="num"
                        value={weatherStation.altitudeMSL}
                        onChangeText={(text) => setWeatherStation((prev : any) => ({ ...prev, altitudeMSL: text }))}
                    />

                    <TitlePartnerSensorContainer>Sensores</TitlePartnerSensorContainer>
                    { sensors && sensors.length > 0 && (
                        <SensorPartnerContainer showsHorizontalScrollIndicator={true} horizontal={true} >
                            {chunkArray(sensors, 3).map((sensorGroup, groupIndex) => (
                                <View key={groupIndex} style={{ flexDirection: 'column', width: 300 }}>
                                    {sensorGroup.map((sensor : any) => {
                                        const isCheck = weatherStation.sensors.findIndex((s : any) => s.id === sensor.id) !== -1;
                                        return (
                                            <ManegeInformationCard 
                                                key={sensor.id}
                                                title={sensor.name} 
                                                hideBackground 
                                                onPressCheck={() => handlePressCheck(sensor)}
                                                showCheck 
                                                showInfo
                                                onPressInfo={() => handleOpenModalSensor(sensor)} 
                                                isCheck={isCheck}
                                            />
                                        );
                                    })}
                                </View>
                            ))}
                        </SensorPartnerContainer>
                    )}


                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Parceiros</TitlePartnerSensorContainer>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <FontAwesomeIcon icon={faPlus} color="#00FF00" size={20} />
                        </TouchableOpacity>
                    </PartnerHeader>
                    {
                        weatherStation && weatherStation.partners && weatherStation.partners.length > 0 ? (
                            <SensorPartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {chunkArray(weatherStation.partners, 3).map((partnerGroup, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 300 }}>
                                        {partnerGroup.map((partner : any, index : any) => (
                                            <ManegeInformationCard 
                                                key={index}
                                                title={partner.name} 
                                                hideBackground 
                                                showEdit 
                                                showDelete
                                                onPressEdit={() => handleEditPartner(partner, index)}
                                                onPressDelete={() => handleDeletePartner(index)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </SensorPartnerContainer>
                        ) : (
                            <SensorPartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <NoPartner>Nenhum Parceiro Cadastrado</NoPartner>
                            </SensorPartnerContainer>
                        )
                    }

                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Tipo da Estação:</TitlePartnerSensorContainer>
                    </PartnerHeader>
                    <ContainerPublicPrivate>
                        <ButtonPublicPrivate onPress={() => setWeatherStation(prevState => ({ ...prevState, isPrivate: false }))} bgColor={weatherStation.isPrivate ? "BLUE" : "GREEN"}>
                            <ButtonText>Estação Pública</ButtonText>    
                        </ButtonPublicPrivate>
                        <ButtonPublicPrivate onPress={() => setWeatherStation(prevState => ({ ...prevState, isPrivate: true }))} bgColor={weatherStation.isPrivate ? "GREEN" : "BLUE"}>
                            <ButtonText>Estação Privada</ButtonText>    
                        </ButtonPublicPrivate>
                    </ContainerPublicPrivate>
                    
                    {
                        weatherStation && weatherStation.photoBase64 && (
                            <>
                            <PartnerHeader>
                                <TitlePartnerSensorContainer>Foto</TitlePartnerSensorContainer>
                                <TouchableOpacity onPress={() => {const updatedWeatherStation = { ...weatherStation, image: undefined }; setWeatherStation(updatedWeatherStation);}}>
                                    <FontAwesomeIcon icon={faTrash} color="red" size={20} />
                                </TouchableOpacity>
                            </PartnerHeader>
                                <Image source={{ uri: `data:image/jpeg;base64,${weatherStation.photoBase64}` }}/>
                            </>
                        )
                    }

                    <ContainerButtons>
                        <Button title={weatherStation.photoBase64 ? "Adicionar nova foto" : "Adicionar Foto"} onPress={() => setShowModalImage(true)} color="SECONDARY" />
                        <Button title="Cadastrar Estação" onPress={() => RegisterStation(weatherStation)} color="PRIMARY" />
                    </ContainerButtons>
                </FormContainer>
            </KeyboardAwareScrollView>
            </ScrollView>

            <ModalPartners 
                showModal={showModal}  
                onSubmit={(data) => handleSubmitPartner(data)} 
                onCloseModal={() => {setShowModal(false); setPartner(undefined); setEditingPartnerIndex(null)}} 
                partner={partner}
            />
            {
                showModalSensor &&
                <ContainerModalSensor>
                    <ModalInfoSensor
                        showModal={showModalSensor}
                        sensorInfo={sensor}
                        onClose={() => {setShowModalSensor(false)}}
                    />
                </ContainerModalSensor>
            }

            {
                showModalLocation &&
                    <ModalLocation
                        showModal={showModalLocation}
                        onSubmit={(data) => {
                            setWeatherStation((prev: any) => ({
                                ...prev,
                                longitude: Number(data.longitude).toFixed(6),
                                latitude: Number(data.latitude).toFixed(6),
                                altitudeMSL: Number(data.altitude).toFixed(6)
                            }));                        
                            setShowModalLocation(false)
                        }}
                        onCloseModal={() => {setShowModalLocation(false)}}
                    />
            }
            
            {showModalImage &&
                <ModalImagePicker
                    showModal={showModalImage}
                    onClose={() => {setShowModalImage(false)}}
                    onSubmit={(data) => {
                        setWeatherStation((prev: any) => ({
                            ...prev,
                            photoBase64: data
                        }));
                        setShowModalImage(false)
                    }}
                />
            }

        </Container>
    )
}