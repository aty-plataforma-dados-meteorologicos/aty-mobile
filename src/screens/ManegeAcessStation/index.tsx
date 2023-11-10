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
            photoBase64: '',
            sensors: [],
        }
    );
    const [usersWhithAcess, setUsersWhithAcess] = useState<any[]>();
    const [usersWhithAcessPendent, setUsersWhithAcessPendent] = useState<any[]>();
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation(){
        const response = await service.getWeatherStationById(stationId || '1')
        setWeatherStation(response)
    }

    async function getUsersWhiAcess(){
        const response = await service.getUserAcessByIdStation(stationId || '1', 20)
        setUsersWhithAcess(response.data)
    }

    async function getUsersWhiAcessPendent(){
        const response = await service.getUserAcessByIdStation(stationId || '1', 10)
        setUsersWhithAcessPendent(response.data)
    }

    async function handleConfirmUser(idUser : any){
        const response = await service.aceptRejectUserSolicitation(stationId, idUser, 20)
    }

    async function handleRejectDeleteUser(idUser : any){
        const response = await service.aceptRejectUserSolicitation(stationId, idUser, 30)
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
        getUsersWhiAcess()
        getUsersWhiAcessPendent()
    }, [])

    return(
        <Container>
            <HeaderApp title={weatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack}/>
            <ListContainer>

                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Acessos Solicitados</TitlePartnerSensorContainer>
                    </PartnerHeader>
                    {
                        usersWhithAcessPendent && usersWhithAcessPendent.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {chunkArray(usersWhithAcess, 3).map((usersWhithAcessGroup, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {usersWhithAcessGroup.map((user: any) => (
                                            <ManegeInformationCard 
                                                key={user.userId}
                                                title={user.userEmail}
                                                hideBackground 
                                                showDelete
                                                showConfirm
                                                onPressConfirm={() => handleConfirmUser(user.userId)}
                                                onPressDelete={() => handleRejectDeleteUser(user.userId)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </PartnerContainer>
                        ) : (
                            <PartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ListEmpty message="Nenhum acesso solicitado" />
                            </PartnerContainer>
                        )
                    }
                </ItemContainer>

                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Acessos Concedidos</TitlePartnerSensorContainer>
                    </PartnerHeader>
                    {
                        usersWhithAcess && usersWhithAcess.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {chunkArray(usersWhithAcess, 3).map((usersWhithAcessGroup, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {usersWhithAcessGroup.map((user: any) => (
                                            <ManegeInformationCard 
                                                key={user.userId}
                                                title={user.userEmail}
                                                hideBackground 
                                                showDelete
                                                onPressDelete={() => handleRejectDeleteUser(user.userId)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </PartnerContainer>
                        ) : (
                            <PartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ListEmpty message="Nenhum acesso concedido" />
                            </PartnerContainer>
                        )
                    }
                </ItemContainer>

            </ListContainer>
        </Container>
    )
}