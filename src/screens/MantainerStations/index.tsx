import React, { useContext, useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { NavigationContext, useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import WeatherStationData from "../../interfaces/WeatherStation/WeatherStationData";
import { StackType } from "../../interfaces/routes/routs";

export function MantainerStations(){
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>();
    const [photos, setPhotos] = useState<Record<string, string>>({});
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAllMantainerStation(){
        const response = await service.getAllWeatherStationByMantainer()
        setWeatherStations(response.data)
        loadPhotos(response.data);
    }

    async function loadPhotos(stations: WeatherStationData[]) {
        const newPhotos = {};
        for (const station of stations) {
            const response = await service.getWeatherStationPhoto(station.id);
            if (response) {
                newPhotos[station.id] = response;
            }
        }
        setPhotos(newPhotos);
    }


    function handleBack() {
        if (navigate.canGoBack()) {
            navigate.goBack();
        } else {
            navigate.navigate('Home');
        }
    }
    
    

    function handleStation(id: string){
        navigate.navigate('Station', { stationId: id })
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
                                onPressIcon={() => handleStation(item.id || '1')}
                                title={item.name || "Estação sem nome"}
                                subtitle={item.isPrivate ? "Estação Privada" : "Estação Pública"}
                                imageUri={photos[item.id] || undefined}
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