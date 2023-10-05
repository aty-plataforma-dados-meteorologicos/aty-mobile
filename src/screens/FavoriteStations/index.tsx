import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { ListEmpty } from "../../components/ListEmpty";

export function FavoriteStations(){
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation();

    async function getAllMantainerStation(){
        const response = await service.getAllStationFavoritesByUser()
        setWeatherStations(response.data)   
    }


    function handleBack(){
        (navigate.navigate as any)('Home')
    }

    useEffect(() => {
        getAllMantainerStation()
        console.log(weatherStations)
    }, [])

    return(
        <Container>
            <HeaderApp title="Estações Favoritas" onMenuPress={handleBack}/>
            <ListContainer>
                <List
                    data={weatherStations}
                    keyExtractor={(item : any) => item.id.toString()}
                    renderItem={({item} : any) => (
                        <StationCardList
                            onPressPhoto={() => console.log('Photo Pressed!')}
                            onPressIcon={() => console.log('Icon Pressed!')}
                            title={item.name} 
                            subtitle={item.isPrivate ? "Estação Privada" : "Estação Pública"}
                        />
                    )}
                    ListEmptyComponent={<ListEmpty message="Você não possui nenhuma estação favoritada" />}
                    showsVerticalScrollIndicator={false}
                />
            </ListContainer>
        </Container>
    )
}