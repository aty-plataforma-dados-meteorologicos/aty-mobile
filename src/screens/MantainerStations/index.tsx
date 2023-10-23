import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, List, ListContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { StationCardList } from "../../components/StationCardList";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import WeatherStationData from "../../interfaces/WeatherStation/WeatherStationData";

export function MantainerStations(){
    const [weatherStations, setWeatherStations] = useState<WeatherStationData[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation();

    async function getAllMantainerStation(){
        const response = await service.getAllWeatherStationByMantainer()
        setWeatherStations(response.data) 
    }


    function handleBack(){
        (navigate.navigate as any)('Home')
    }

    useEffect(() => {
        getAllMantainerStation()
    }, [])

    return(
        <Container>
            <HeaderApp title="Minhas Estações" onMenuPress={handleBack}/>
            <ListContainer>
                <List
                    data={weatherStations}
                    keyExtractor={(item : any) => item.id.toString()}
                    renderItem={({item} : any) => (
                        <StationCardList
                            onPressPhoto={() => console.log('Photo Pressed!')}
                            onPressIcon={() => console.log('Icon Pressed!')}
                            title={item.name} // Substitua pelos nomes reais das propriedades
                            subtitle={item.isPrivate ? "Estação Privada" : "Estação Pública"}
                        />
                    )}
                    ListEmptyComponent={<ListEmpty message="Você não possui nenhuma estação" />}
                    showsVerticalScrollIndicator={false}
                />
            </ListContainer>
        </Container>
    )
}