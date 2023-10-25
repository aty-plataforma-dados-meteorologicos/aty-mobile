import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import WeatherStationData from "../../interfaces/WeatherStation/WeatherStationData";
import { StackType } from "../../interfaces/routes/routs";

type Props = {
    stationId?: string;
}

export function PanoramStation({ stationId } : Props){
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation(){
        const response = await service.getWeatherStationById(stationId || '1')
        setWeatherStation(response) 
        console.log(response)
    }

    function handleBack(){
        navigate.goBack()
    }

    useEffect(() => {
        getStation()
    }, [])

    return(
        <Container>
            <HeaderApp title={weatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack}/>
            <ListContainer>
                
            </ListContainer>
        </Container>
    )
}