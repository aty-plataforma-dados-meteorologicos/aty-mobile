import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, ItemContainer, ListContainer, PartnerContainer, PartnerHeader, TitlePartnerSensorContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import { StackType } from "../../interfaces/routes/routs";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import { View } from "react-native";

type Props = {
    stationId?: string;
}

export function ManegeAcessStation({ stationId }: Props) {
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>({
        id: '0',
        name: '',
        latitude: '',
        longitude: '',
        altitudeMSL: '',
        partners: [],
        photoBase64: '',
        sensors: [],
    });
    const [usersWithAcess, setUsersWithAcess] = useState<any[]>([]);
    const [usersWithAcessPendent, setUsersWithAcessPendent] = useState<any[]>([]);
    const [usersWithAcessGroups, setUsersWithAcessGroups] = useState<any[][]>([]);
    const [usersWithAcessPendentGroups, setUsersWithAcessPendentGroups] = useState<any[][]>([]);

    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation() {
        const response = await service.getWeatherStationById(stationId || '1');
        setWeatherStation(response);
    }

    async function getUsersWithAcess() {
        const response = await service.getUserAcessByIdStation(stationId || '1', 20);
        setUsersWithAcess(response.data);
    }

    async function getUsersWithAcessPendent() {
        const response = await service.getUserAcessByIdStation(stationId || '1', 10);
        setUsersWithAcessPendent(response.data);
    }

    async function handleConfirmUser(idUser: any) {
        const response = await service.aceptRejectUserSolicitation(stationId, idUser, 20);
        if (response) {
            getUsersWithAcess();
            getUsersWithAcessPendent();
        }
    }

    async function handleRejectDeleteUser(idUser: any) {
        const response = await service.aceptRejectUserSolicitation(stationId, idUser, 30);
        if (response) {
            getUsersWithAcess();
            getUsersWithAcessPendent();
        }
    }

    function handleBack() {
        navigate.navigate("Home");
    }

    function chunkArray(myArray: any[], chunk_size: number) {
        if (!Array.isArray(myArray) || myArray.length === 0) {
            return [];
        }
    
        let tempArray = [];
        for (let index = 0; index < myArray.length; index += chunk_size) {
            let chunk = myArray.slice(index, index + chunk_size);
            tempArray.push(chunk);
        }
    
        return tempArray;
    }

    useEffect(() => {
        getStation();
        getUsersWithAcess();
        getUsersWithAcessPendent();
    }, []);

    useEffect(() => {
        setUsersWithAcessGroups(chunkArray(usersWithAcess, 3));
        setUsersWithAcessPendentGroups(chunkArray(usersWithAcessPendent, 3));
    }, [usersWithAcess, usersWithAcessPendent]);

    return (
        <Container>
            <HeaderApp title={weatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack} />
            <ListContainer>
                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Acessos Solicitados</TitlePartnerSensorContainer>
                    </PartnerHeader>
                    { usersWithAcessPendent &&
                        usersWithAcessPendent.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {usersWithAcessPendentGroups.map((group, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {group.map((user: any) => (
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
                    { usersWithAcess &&
                        usersWithAcess.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {usersWithAcessGroups.map((group, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {group.map((user: any) => (
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
    );
}
