import React, { useEffect, useState } from "react";
import { HeaderApp } from "../../components/HeaderApp";
import { Container, ContainerButtons, Image, ImageContainer, ItemContainer, ListContainer, PartnerContainer, PartnerHeader, SensorPartnerContainer, TitleItem, TitlePartnerSensorContainer } from "./styles";
import { WeatherStationsService } from "../../services/WeatherStationService";
import { useNavigation } from "@react-navigation/native";
import { ListEmpty } from "../../components/ListEmpty";
import { StackType } from "../../interfaces/routes/routs";
import WeatherStationData from "../../interfaces/weatherStation/WeatherStationData";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import PartnerData from "../../interfaces/partner/PartnerData";
import { Input } from "../../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Alert, View } from "react-native";
import { ModalPartners } from "../../components/ModalPartners";
import { Button } from "../../components/Button";
import { ModalImagePicker } from "../../components/ModalImagePicker";
import MantainerData from "../../interfaces/weatherStation/MantainerData";
import { ModalMantainer } from "../../components/ModalMantainer";
import * as Notification from 'expo-notifications'

type Props = {
    stationId?: string;
}

export function EditStation({ stationId } : Props){
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
    const [mantainer, setMantainer] = useState<MantainerData[]>();
    const [originalWeatherStation, setOriginalWeatherStation] = useState<WeatherStationData>();
    const [weatherStationPhoto, setWeatherStationPhoto] = useState<String>();
    const [showModalPartner, setShowModalPartner] = useState(false);
    const [showModalImage, setShowModalImage] = useState(false);
    const [showModalMantainer, setShowModalMantainer] = useState(false);
    const [partner, setPartner] = useState()
    const [loading, setLoading] = useState<boolean>(false);
    const service = new WeatherStationsService();
    const navigate = useNavigation<StackType>();

    async function getStation(){
        const response = await service.getWeatherStationById(stationId || '1')
        setWeatherStation(response) 
        setOriginalWeatherStation(response)
    }

    async function getMaintainers(){
        const response = await service.getAllMaintainersByWeatherStationId(stationId || '1')
        setMantainer(response.data)
    }

    async function getWeatherStationPhoto(stationid : string){
        try {
            const response = await service.getWeatherStationPhoto(stationid)
            if(response){
                setWeatherStationPhoto(response)
            }
        } catch (error) {
            
        }
        
    }

    function handleBack(){
        navigate.navigate("Home")
    }
    
    function handleDeletePartner(partnerId: number) {
        const updatedPartners = weatherStation?.partners.filter((partner: any) => partner.id !== partnerId);
        setWeatherStation((prevState: any) => {
            return {
                ...prevState,
                partners: updatedPartners
            };
        });
    }

    function handleSubmitPartner(partner: PartnerData) {
        setWeatherStation((prevState : any) => {
            // Tentamos encontrar o índice do parceiro com base no ID.
            const partnerIndex = prevState.partners.findIndex((p : any) => p.id === partner.id);
            
            // Se encontramos o parceiro existente, substituímos ele.
            if (partnerIndex !== -1) {
                const updatedPartners = [...prevState.partners];
                updatedPartners[partnerIndex] = partner;
                
                return {
                    ...prevState,
                    partners: updatedPartners
                };
            }
            
            // Se não encontramos o parceiro existente, adicionamos ele à lista.
            return {
                ...prevState,
                partners: [...prevState.partners, partner]
            };
        });

        setShowModalPartner(false);
        setPartner(undefined)
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

    async function UpdateStation() {
        setLoading(true)
            try {
                const response = await service.updateWeatherStation(weatherStation);
                if(response){
                    Alert.alert("Sucesso", "Estação atualizada com sucesso")
                    getStation()
                }
            } catch (error) {
                console.log(error)
            }
        setLoading(false)
    }

    function hasStationChanged(): boolean {
        return JSON.stringify(weatherStation) !== JSON.stringify(originalWeatherStation);
    }

    async function handleAddMantainer(email : string){
        try {
            const response = await service.addWeatherStationMainteiner(weatherStation, email);
            if(response){
                setShowModalMantainer(false)
                alert("Mantenedor adicionado com sucesso")
                getMaintainers()
                getStation()
            } else{
                alert("Mantenedor não encontrado")
            }
        } catch (error) {
            alert("Erro ao adicionar mantenedor")
        }
        
    }

    async function handleDeleteMantainer(mantainerId : number){
        try {
            const response = await service.deleteMantainer(weatherStation.id, mantainerId);
            if(response){
                alert("Mantenedor removido com sucesso")
                getMaintainers()
                getStation()
            }
        } catch (error) {
            alert("Erro ao remover mantenedor")
        }
    }
    

    useEffect(() => {
        getStation()
        getMaintainers()
        getWeatherStationPhoto(stationId || '0')
    }, [])

    return(
        <Container>
            <HeaderApp title={originalWeatherStation?.name || "Estação Meteorológica"} onMenuPress={handleBack}/>
            <ListContainer>
                <ItemContainer>
                    <Input 
                        titleInput="Nome da Estação" 
                        placeholder="Insira o nome da estação"
                        onChangeText={(text) => setWeatherStation((prev : any) => ({ ...prev, name: text }))}
                        value={weatherStation?.name}
                    />
                </ItemContainer>


                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Parceiros</TitlePartnerSensorContainer>
                        <TouchableOpacity onPress={() => setShowModalPartner(true)}>
                            <FontAwesomeIcon icon={faPlus} color="#00FF00" size={20} />
                        </TouchableOpacity>
                    </PartnerHeader>
                    {
                        weatherStation && weatherStation.partners && weatherStation.partners.length > 0 ? (
                            <PartnerContainer showsVerticalScrollIndicator={false} horizontal={true}>
                                {chunkArray(weatherStation.partners, 3).map((partnerGroup, groupIndex) => (
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 350 }}>
                                        {partnerGroup.map((partner: any) => (
                                            <ManegeInformationCard 
                                                key={partner.id}
                                                title={partner.name} 
                                                email={partner.email || ""}
                                                hideBackground 
                                                showEdit 
                                                showDelete
                                                onPressEdit={() => {setPartner(partner); setShowModalPartner(true)}}
                                                onPressDelete={() => handleDeletePartner(partner.id)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </PartnerContainer>
                        ) : (
                            <PartnerContainer contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ListEmpty message="Nenhum parceiro cadastrado" />
                            </PartnerContainer>
                        )
                    }
                </ItemContainer>

                <ItemContainer>
                    <PartnerHeader>
                        <TitlePartnerSensorContainer>Mantenedores</TitlePartnerSensorContainer>
                        <TouchableOpacity onPress={() => setShowModalMantainer(true)}>
                            <FontAwesomeIcon icon={faPlus} color="#00FF00" size={20} />
                        </TouchableOpacity>
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
                                                showEdit 
                                                showDelete
                                                onPressEdit={() => {setPartner(mantainer); setShowModalPartner(true)}}
                                                onPressDelete={() => handleDeleteMantainer(mantainer.applicationUserId)}
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
                    <TitleItem>Foto</TitleItem>
                    <ImageContainer>
                        <Image source={weatherStationPhoto != undefined ? { uri: `data:image/jpeg;base64,${weatherStationPhoto}` } : require('../../assets/aty.png')}/>
                    </ImageContainer>
                </ItemContainer>

                <ContainerButtons>
                        <Button title={weatherStationPhoto ? "Adicionar nova foto" : "Adicionar Foto"} onPress={() => setShowModalImage(true)} color="SECONDARY" />
                        <Button title="Atualizar Estação" onPress={() =>{hasStationChanged() ? UpdateStation() : console.log("Não foi")} } color="PRIMARY" isLoading={loading} />
                </ContainerButtons>
            </ListContainer>

            <ModalPartners 
                showModal={showModalPartner}  
                onSubmit={(data) => handleSubmitPartner(data)} 
                onCloseModal={() => {setShowModalPartner(false); setPartner(undefined)}} 
                partner={partner}
            />

            {showModalImage &&
                <ModalImagePicker
                    showModal={showModalImage}
                    onClose={() => {setShowModalImage(false)}}
                    onSubmit={(data) => {
                        setWeatherStation((prev: any) => ({
                            ...prev,
                            photoBase64: data
                        }));
                        setWeatherStationPhoto(data)
                        setShowModalImage(false)
                    }}
                />
            }

            {
                showModalMantainer &&
                <ModalMantainer
                    showModal={showModalMantainer}
                    onClose={() => {setShowModalMantainer(false)}}
                    onSubmit={(email) => handleAddMantainer(email)}
                />
            }

        </Container>
    )
}