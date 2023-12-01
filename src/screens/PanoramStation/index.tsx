import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, ContainerList, ListContainer, Sensor } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import { StackType } from "../../interfaces/routes/routs";
import Collapsible from 'react-native-collapsible';
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import WeatherStationSensorData from "../../interfaces/weatherStation/WeatherStationSensorData";
import SensorData from "../../interfaces/sensor/SensorData";
import { Graph } from "../../components/GraphHighcharts";
import { ListEmpty } from "../../components/ListEmpty";

type Props = {
    stationId?: string;
}

export function PanoramStation({ stationId } : Props){
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
    const [collapsedItemId, setCollapsedItemId] = useState<number | null>(null);
    const [data, setData] = useState<WeatherStationSensorData>();
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation(){
        const response = await service.getWeatherStationById(stationId || '1')
        setWeatherStation(response)
    }

    async function getData(sensorId: number) {
        const response = await service.getDataBySensor(stationId || "1", sensorId, null, null );
        setData(response)
    }

    function handleBack(){
        navigate.goBack()
    }

    function handleToggleItemCollapse(id: number) {
        getData(id);
        if(data){
            setCollapsedItemId(prevId => (prevId === id ? null : id));
        }
    }
    

    useEffect(() => {
        getStation()
    }, [])

    return(
        <Container>
            <HeaderApp title={weatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack}/>
            <ListContainer>
                {weatherStation?.sensors.map(item => (
                    <Sensor key={item.id}>
                        <ManegeInformationCard
                            title={item.name}
                            showArrow
                            isArrow={collapsedItemId !== item.id}
                            onPressArrow={() => handleToggleItemCollapse(item.id)}
                        />
                        <Collapsible collapsed={collapsedItemId !== item.id}>
                            {data?.measurements ? (
                                <Graph data={data} />
                            ) : (
                                <ContainerList>
                                    <ListEmpty message="Nenhum dado coletado nas últimas 24 horas" />
                                </ContainerList>
                            )}
                        </Collapsible>
                    </Sensor>
                ))}
            </ListContainer>
        </Container>
    )
}