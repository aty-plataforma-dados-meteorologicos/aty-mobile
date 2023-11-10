import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, ContainerModalSensor, Image, ImageContainer, ItemContainer, ListContainer, SensorPartnerContainer, TitleItem } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import { StackType } from "../../interfaces/routes/routs";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { MapInformation } from "../../components/MapInformation";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import SensorData from "../../interfaces/sensor/SensorData";
import { ModalInfoSensor } from "../../components/ModalSensor";
import { ModalInfoPartner } from "../../components/ModalInfoParners";
import PartnerData from "../../interfaces/partner/PartnerData";

type Props = {
    stationId?: string;
}

export function InfoStation({ stationId } : Props){
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
    const [showModalSensor, setShowModalSensor] = useState(false);
    const [showModalPartner, setShowModalPartner] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [sensor, setSensor] = useState<SensorData>({
        measurementType: 0, 
        id: 0,              
        name: '',           
        measurementUnit: '',
        minimum: 0,         
        maximum: 0,         
        accuracy: 0,        
        isEnabled: false
    });
    const [partner, setPartner] = useState<PartnerData>({
        name: '',
        cpfOrCnpj: '',
        email: '',
        phone: '',
        site: '',
        notes: '',
        isPublicData: false
    })
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation(){
        const response = await service.getWeatherStationById(stationId || '1')
        setWeatherStation(response)
        setShowMap(true)
    }

    function handleBack(){
        navigate.navigate("Home")
    }

    function handleOpenModalSensor(sensor : SensorData){
        setSensor(sensor);
        setShowModalSensor(true)
        console.log(weatherStation)
    }

    function handleOpenModalPartner(partner : PartnerData){
        setPartner(partner);
        setShowModalPartner(true)
    }

    useEffect(() => {
        getStation()
    }, [])

    return(
        <Container>
            <HeaderApp title={weatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack}/>
            <ListContainer>
                <ItemContainer>
                    <TitleItem>Localização</TitleItem>
                    {
                        showMap && (
                            <MapInformation latitude={weatherStation.latitude} longitude={weatherStation.longitude} altura={weatherStation?.altitudeMSL}/>
                    )}
                </ItemContainer>
                <ItemContainer>
                    <TitleItem>Sensores</TitleItem>
                    <SensorPartnerContainer>
                        {weatherStation?.sensors.map((sensor : any) => {
                        return (
                            <ManegeInformationCard 
                                key={sensor.id}
                                title={sensor.name} 
                                hideBackground
                                showInfo
                                onPressInfo={() => handleOpenModalSensor(sensor)} 
                            />
                        );
                    })}
                    </SensorPartnerContainer>
                </ItemContainer>
                <ItemContainer>
                    <TitleItem>Parceiros</TitleItem>
                    <SensorPartnerContainer>
                    {weatherStation && weatherStation.partners.length == 0 ? (
                        <ListEmpty message="Nenhum parceiro cadastrado" />
    
                    ) : (
                        weatherStation?.partners.map((partner : any) => (
                            <ManegeInformationCard 
                                key={partner.id}
                                title={partner.name} 
                                hideBackground
                                showInfo
                                onPressInfo={() => handleOpenModalPartner(partner)} 
                            />
                        ))
                    )}

                    </SensorPartnerContainer>
                </ItemContainer>
                <ItemContainer>
                    <TitleItem>Foto</TitleItem>
                    <ImageContainer>
                        <Image source={{ uri: `data:image/jpeg;base64,${weatherStation?.photoBase64}` }}/>
                    </ImageContainer>
                </ItemContainer>
            </ListContainer>
            

            {
                showModalSensor && sensor && (
                        <ModalInfoSensor
                            showModal={showModalSensor}
                            sensorInfo={sensor}
                            onClose={() => {setShowModalSensor(false)}}
                        />
            )}

            {
                showModalPartner && partner && (
                        <ModalInfoPartner
                            showModal={showModalPartner}
                            partnerInfo={partner}
                            onClose={() => {setShowModalPartner(false)}}
                        />
            )}

        </Container>
    )
}