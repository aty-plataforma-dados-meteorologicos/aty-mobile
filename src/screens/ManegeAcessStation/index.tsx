import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, ItemContainer, ListContainer, PartnerContainer, PartnerHeader, TitlePartnerSensorContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import { StackType } from "../../interfaces/routes/routs";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import { Alert, View } from "react-native";
import MantainerData from "../../interfaces/weatherStation/MantainerData";

type Props = {
    stationId?: string;
}

export function ManegeAcessStation({ stationId } : Props){
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>(
        {
            id: '0',
            name: '',
            latitude: '',
            longitude: '',
            altitudeMSL: '',
            partners: [],
            image: '',
            sensors: [],
        }
    );
    const [mantainer, setMantainer] = useState<MantainerData[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation(){
        const response = await service.getWeatherStationById(stationId || '1')
        setWeatherStation(response)
    }

    async function getMaintainers(){
        const response = await service.getAllMaintainersByWeatherStationId(stationId || '1')
        setMantainer(response.data)
    }

    function handleBack(){
        navigate.navigate("Home")
    }

    function chunkArray(myArray : any, chunk_size : any){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            let chunk = myArray.slice(index, index+chunk_size);
            tempArray.push(chunk);
        }
    
        return tempArray;
    }
    

    useEffect(() => {
        getStation()
        getMaintainers()
    }, [])

    return(
        <Container>
            <HeaderApp title={weatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack}/>
            <ListContainer>

                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Acessos Concedidos</TitlePartnerSensorContainer>
                    </PartnerHeader>
                    {
                        mantainer && mantainer.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {chunkArray(mantainer, 3).map((mantainerGroup, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {mantainerGroup.map((mantainer: any) => (
                                            <ManegeInformationCard 
                                                key={mantainer.applicationUserId}
                                                title={mantainer.applicationUserName}
                                                email={mantainer.applicationUserEmail}
                                                hideBackground 
                                                showDelete
                                                showConfirm
                                                onPressConfirm={() => console.log(mantainer.applicationUserId)}
                                                onPressDelete={() => console.log(mantainer.applicationUserId)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </PartnerContainer>
                        ) : (
                            <PartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ListEmpty message="Nenhum mantenedor cadastrado" />
                            </PartnerContainer>
                        )
                    }
                </ItemContainer>

                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Acessos Concedidos</TitlePartnerSensorContainer>
                    </PartnerHeader>
                    {
                        mantainer && mantainer.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {chunkArray(mantainer, 3).map((mantainerGroup, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {mantainerGroup.map((mantainer: any) => (
                                            <ManegeInformationCard 
                                                key={mantainer.applicationUserId}
                                                title={mantainer.applicationUserName}
                                                email={mantainer.applicationUserEmail}
                                                hideBackground 
                                                showDelete
                                                onPressDelete={() => console.log(mantainer.applicationUserId)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </PartnerContainer>
                        ) : (
                            <PartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ListEmpty message="Nenhum mantenedor cadastrado" />
                            </PartnerContainer>
                        )
                    }
                </ItemContainer>

            </ListContainer>
        </Container>
    )
}