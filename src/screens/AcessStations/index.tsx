import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import { StackType } from "../../interfaces/routes/routs";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";

export function AcessStations(){
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAcessStation(){
        const response = await service.getAllAcessStation()
        setWeatherStations(response.data)
    }


    function handleBack(){
        // navigate.reset({
        //     index: 0,
        //     routes: [{name: 'Home'}]
        // })
        navigate.goBack()
    }

    function handleStation(id: string){
        navigate.navigate('Station', { stationId: id })
    }

    useEffect(() => {
        getAcessStation()
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
                                title={item.name || "Estação sem nome"}
                                subtitle={item.isPrivate ? "Estação Privada" : "Estação Pública"}
                                imageUri={item.photoBase64 || undefined}
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