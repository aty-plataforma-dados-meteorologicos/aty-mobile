import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import { StackType } from "../../interfaces/routes/routs";

export function AcessStations(){
    const [weatherStations, setWeatherStations] = useState([]);
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAllMantainerStation(){
    }


    function handleBack(){
        navigate.navigate('Home')
    }

    function handleStation(id: string){
        navigate.navigate('Station', { stationId: id })
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
                                onPressIcon={() => handleStation(item.id || '1')}
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