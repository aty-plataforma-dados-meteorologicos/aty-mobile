import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { ButtonMap, Container, FormContainer, LocationContainer, SensorContainer, TitleSensorContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { ListEmpty } from "../../components/ListEmpty";
import { Input } from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SensorService from "../../services/SensorService";
import { ScrollView, View } from "react-native";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import SensorData from "../../interfaces/sensor/SensorData";
import { InputLocation } from "../../components/InputLocation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function RegisterStation(){
    const [weatherStation, setWeatherStation] = useState<WeatherStationData[]>();
    const [sensors, setSensors] = useState<SensorData[]>();
    const [sensorsRegister, setSensorRegister] = useState<SensorData[]>([])
    const serviceSensor = new SensorService();
    const navigate = useNavigation();

    async function getAllSensors(){
        const response = await serviceSensor.getAllSensors();
        setSensors(response.data)
    }

    function handleTeste(text : string){
        console.log(text)
    }

    function handleBack(){
        (navigate.navigate as any)('Home')
    }

    function handlePressCheck(sensor: SensorData) {
        const index = sensorsRegister?.findIndex((s) => s.id === sensor.id) ?? -1;
        if (index === -1) {
            if (!sensorsRegister || sensorsRegister.length === 0) {
                setSensorRegister([sensor]);
            } else {
                setSensorRegister([...sensorsRegister, sensor]);
            }
        } else {
            const newSensorsRegister = [...(sensorsRegister || [])];
            newSensorsRegister.splice(index, 1);
            setSensorRegister(newSensorsRegister);
        }
    }

    useEffect(() => {
        getAllSensors();
        console.log(sensorsRegister)
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
                        onChangeTeste={(text) => handleTeste(text)}
                    />

                    <LocationContainer>
                        <InputLocation 
                            titleInput="Latitude"
                            placeholder="Insira a Latitude"
                            onChangeText={(text) => handleTeste(text)}
                        />
                        <InputLocation 
                            titleInput="Longitude"
                            placeholder="Insira a Longitude"
                            onChangeText={(text) => handleTeste(text)}
                        />
                        <ButtonMap>
                            <FontAwesomeIcon icon={faLocationDot} color="#000000" size={40}/>
                        </ButtonMap>
                    </LocationContainer>

                    <Input 
                        titleInput="Altura a nivel do mar" 
                        placeholder="Insira altura a nivel do mar"
                        onChangeTeste={(text) => handleTeste(text)}
                    />

                    <TitleSensorContainer>Sensores</TitleSensorContainer>
                    { sensors && sensors.length > 0 && (
                        <SensorContainer showsVerticalScrollIndicator>
                            { sensors.map((sensor) => {
                                const isCheck = sensorsRegister?.findIndex((s) => s.id === sensor.id) !== -1;
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
                        </SensorContainer>
                    )}
                </FormContainer>
            </KeyboardAwareScrollView>
            </ScrollView>
        </Container>
    )
}