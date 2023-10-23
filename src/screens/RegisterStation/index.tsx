import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { ButtonMap, Container, ContainerButtons, FormContainer, LocationContainer, NoPartner, PartnerHeader, SensorPartnerContainer, TitlePartnerSensorContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { Input } from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SensorService from "../../services/SensorService";
import { Alert, ScrollView, View } from "react-native";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import SensorData from "../../interfaces/sensor/SensorData";
import { InputLocation } from "../../components/InputLocation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackType } from "../../interfaces/routes/routs";
import { ModalPartners } from "../../components/ModalPartners";
import PartnerData from "../../interfaces/partner/PartnerData";

export function RegisterStation(){
    const initialWeatherStation: WeatherStationData = {
        name: '',
        latitude: '',
        longitude: '',
        altitudeMSL: '',
        partners: [],
        image: '',
        sensors: [],
    };
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>(initialWeatherStation);
    const [sensors, setSensors] = useState<SensorData[]>();
    const [showModal, setShowModal] = useState(false);
    const [partner, setPartner] = useState<PartnerData>();
    const [editingPartnerIndex, setEditingPartnerIndex] = useState<number | null>(null);
    const serviceSensor = new SensorService();
    const serviceWeatherStation = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAllSensors(){
        const response = await serviceSensor.getAllSensors();
        setSensors(response.data)
    }

    function handleTeste(text : string){
        console.log(text)
    }

    function handleBack(){
        navigate.navigate('Home')
    }

    function handlePressCheck(sensor: SensorData) {
        // Verificar se o sensor já está na lista
        const index = weatherStation.sensors.findIndex((s) => s.id === sensor.id);
      
        if (index === -1) { // Se o sensor não estiver na lista, adicione-o
          setWeatherStation(prevState => ({
            ...prevState,
            sensors: [...prevState.sensors, sensor]
          }));
        } else { // Se estiver na lista, remova-o
          setWeatherStation(prevState => {
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
        setWeatherStation(prevState => {
            // Se estamos em modo de edição
            if (editingPartnerIndex !== null) {
                const updatedPartners = [...prevState.partners];
                updatedPartners[editingPartnerIndex] = data;
                return {
                    ...prevState,
                    partners: updatedPartners
                };
            } else {
                // Se não estamos em modo de edição, adicione um novo partner
                return {
                    ...prevState,
                    partners: [...prevState.partners, data]
                };
            }
        });
        
        // Feche o modal e limpe o partner atual e o índice de edição
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
        setWeatherStation(prevState => {
            return {
                ...prevState,
                partners: updatedPartners
            };
        });
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

        if(isValid){
            try {
                const response = await serviceWeatherStation.createWeatherStation(station)
                if(response){
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
                        onChangeText={(text) => setWeatherStation((prev) => ({ ...prev, name: text }))}
                    />

                    <LocationContainer>
                        <InputLocation 
                            titleInput="Latitude"
                            placeholder="Insira a Latitude"
                            onChangeText={(text) => setWeatherStation((prev) => ({ ...prev, latitude: text }))}
                        />
                        <InputLocation 
                            titleInput="Longitude"
                            placeholder="Insira a Longitude"
                            onChangeText={(text) => setWeatherStation((prev) => ({ ...prev, longitude: text }))}
                        />
                        <ButtonMap>
                            <FontAwesomeIcon icon={faLocationDot} color="#000000" size={40}/>
                        </ButtonMap>
                    </LocationContainer>

                    <Input 
                        titleInput="Altura a nivel do mar" 
                        placeholder="Insira altura a nivel do mar"
                        keyboardType="num"
                        onChangeText={(text) => setWeatherStation((prev) => ({ ...prev, altitudeMSL: text }))}
                    />

                    <TitlePartnerSensorContainer>Sensores</TitlePartnerSensorContainer>
                    { sensors && sensors.length > 0 && (
                        <SensorPartnerContainer showsVerticalScrollIndicator>
                            { sensors.map((sensor) => {
                                const isCheck = weatherStation.sensors.findIndex((s) => s.id === sensor.id) !== -1;
                                return (
                                    <ManegeInformationCard 
                                        key={sensor.id}
                                        title={sensor.name} 
                                        hideBackground 
                                        onPressCheck={() => handlePressCheck(sensor)}
                                        showCheck 
                                        showInfo 
                                        isCheck={isCheck}
                                    />
                                );
                            })}
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
                            <SensorPartnerContainer showsVerticalScrollIndicator>
                                { weatherStation.partners.map((partner, index) => {
                                    return (
                                        <ManegeInformationCard 
                                            key={index}
                                            title={partner.name} 
                                            hideBackground 
                                            showEdit 
                                            showDelete
                                            onPressEdit={() => handleEditPartner(partner, index)}
                                            onPressDelete={() => handleDeletePartner(index)}
                                        />
                                    );
                                })}
                            </SensorPartnerContainer>
                        ) : (
                            <SensorPartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <NoPartner>Nenhum Parceiro Cadastrado</NoPartner>
                            </SensorPartnerContainer>
                        )
                    }
                    <ContainerButtons>
                        <Button title="Adicionar Foto" onPress={() => console.log("Cliclou foto")} color="SECONDARY" />
                        <Button title="Cadastrar Estação" onPress={() => RegisterStation(weatherStation)} color="PRIMARY" />
                    </ContainerButtons>
                </FormContainer>
            </KeyboardAwareScrollView>
            </ScrollView>

            <ModalPartners showModal={showModal} onSubmit={(data) => handleSubmitPartner(data)} onCloseModal={() => {setShowModal(false); setPartner(undefined); setEditingPartnerIndex(null)}} partner={partner}/>
        </Container>
    )
}