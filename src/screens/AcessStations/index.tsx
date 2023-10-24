import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";

export function AcessStations(){
    const [weatherStations, setWeatherStations] = useState([]);
    const service = new WeatherStationsService();
    const navigate = useNavigation();

    async function getAllMantainerStation(){
    }


    function handleBack(){
        (navigate.navigate as any)('Home')
    }

    useEffect(() => {
        getAllMantainerStation()
    }, [])

    return(
        <Container>
            <HeaderApp title="Estações com Acesso" onMenuPress={handleBack}/>
            <ListContainer>
                {
                    weatherStations && weatherStations.length > 0 ? (
                        weatherStations.map(item => (
                            <StationCardList
                                key={item.id}
                                onPressPhoto={() => console.log('Photo Pressed!')}
                                onPressIcon={() => console.log('Icon Pressed!')}
                                title={item.name}
                                subtitle={item.isPrivate ? "Estação Privada" : "Estação Pública"}
                            />
                        ))
                    ) : (
                        <ListEmpty message="Você não possui nenhuma estação com acesso" />
                    )
                }
            </ListContainer>
        </Container>
    )
}