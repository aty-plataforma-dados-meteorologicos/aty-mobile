import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import WeatherStationData from "../../interfaces/WeatherStation/WeatherStationData";
import { StackType } from "../../interfaces/routes/routs";

export function FavoriteStations() {
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>([]);
    const [photos, setPhotos] = useState<Record<string, string>>({}); // Dicionário para armazenar as fotos
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getAllMantainerStation() {
        const response = await service.getAllStationFavoritesByUser();
        setWeatherStations(response.data);
        loadPhotos(response.data); // Carregar fotos após obter estações
    }

    async function loadPhotos(stations: WeatherStationData[]) {
        const newPhotos = {};
        for (const station of stations) {
            const response = await service.getWeatherStationPhoto(station.id);
            if (response) {
                newPhotos[station.id] = response; // Armazenar a foto no dicionário
            }
        }
        setPhotos(newPhotos);
    }

    function handleBack() {
        navigate.goBack();
    }

    function handleStation(id: string) {
        navigate.navigate('Station', { stationId: id });
    }

    useEffect(() => {
        getAllMantainerStation();
    }, []);

    return (
        <Container>
            <HeaderApp title="Estações Favoritas" onMenuPress={handleBack} />
            <ListContainer>
                {
                    weatherStations.length > 0 ? (
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
                        <ListEmpty message="Você não possui nenhuma estação favoritada" />
                    )
                }
            </ListContainer>
        </Container>
    );
}
