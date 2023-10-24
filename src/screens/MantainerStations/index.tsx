import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import WeatherStationData from "../../interfaces/WeatherStation/WeatherStationData";
import { StackType } from "../../interfaces/routes/routs";

export function MantainerStations(){
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAllMantainerStation(){
        const response = await service.getAllWeatherStationByMantainer()
        setWeatherStations(response.data) 
    }


    function handleBack(){
        navigate.navigate('Home')
    }

    useEffect(() => {
        getAllMantainerStation()
    }, [])

    return(
        <Container>
            <HeaderApp title="Minhas Estações" onMenuPress={handleBack}/>
            <ListContainer>
                {
                    weatherStations && weatherStations.length > 0 ? (
                        weatherStations.map(item => (
                            <StationCardList
                                key={item.id}
                                onPressPhoto={() => console.log('Photo Pressed!')}
                                onPressIcon={() => console.log('Icon Pressed!')}
                                title={item.name || "Estação sem nome"}
                                subtitle={item.isPrivate ? "Estação Privada" : "Estação Pública"}
                            />
                        ))
                    ) : (
                        <ListEmpty message="Você não possui nenhuma estação" />
                    )
                }
            </ListContainer>
        </Container>
    )
}