import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, FormContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { ListEmpty } from "../../components/ListEmpty";
import { Input } from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function RegisterStation(){
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation();

    async function getAllMantainerStation(){
        const response = await service.getAllWeatherStationByMantainer()
        setWeatherStations(response.data) 
    }

    function handleTeste(text : string){
        console.log(text)
    }

    function handleBack(){
        (navigate.navigate as any)('Home')
    }

    useEffect(() => {
        getAllMantainerStation()
    }, [])

    return(
        <Container>
            <HeaderApp title="Cadastrar Estação" onMenuPress={handleBack}/>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FormContainer>
                    <Input 
                        titleInput="Nome da Estação" 
                        placeholder="Insira o nome da estação"
                        onChangeTeste={(text) => handleTeste(text)}
                    />

                    <Input 
                        titleInput="Altura a nivel do mar" 
                        placeholder="Insira altura a nivel do mar"
                        onChangeTeste={(text) => handleTeste(text)}
                    />
                </FormContainer>
            </KeyboardAwareScrollView>
        </Container>
    )
}