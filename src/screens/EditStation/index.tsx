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

type Props = {
    stationId?: string;
}

export function EditStation({ stationId } : Props){
    const [weatherStation, setWeatherStation] = useState<WeatherStationData>();
    const [mantainer, setMantainer] = useState<MantainerData[]>();
    const [originalWeatherStation, setOriginalWeatherStation] = useState<WeatherStationData>();
    const [showModalPartner, setShowModalPartner] = useState(false);
    const [showModalImage, setShowModalImage] = useState(false);
    const [showModalMantainer, setShowModalMantainer] = useState(false);
    const [partner, setPartner] = useState()
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
            try {
                const response = await service.updateWeatherStation(weatherStation);
                if(response){
                    Alert.alert("Sucesso", "Estação atualizada com sucesso")
                    getStation()
                }
            } catch (error) {
                console.log(error)
            }
    }

    function hasStationChanged(): boolean {
        return JSON.stringify(weatherStation) !== JSON.stringify(originalWeatherStation);
    }
    

    useEffect(() => {
        getStation()
        getMaintainers()
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
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 300 }}>
                                        {partnerGroup.map((partner: any) => (
                                            <ManegeInformationCard 
                                                key={partner.id}
                                                title={partner.name} 
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
                                    <View key={groupIndex} style={{ flexDirection: 'column', width: 300 }}>
                                        {mantainerGroup.map((mantainer: any) => (
                                            <ManegeInformationCard 
                                                key={mantainer.id}
                                                title={mantainer.applicationUserName} 
                                                hideBackground 
                                                showEdit 
                                                showDelete
                                                onPressEdit={() => {setPartner(mantainer); setShowModalPartner(true)}}
                                                onPressDelete={() => handleDeletePartner(mantainer.id)}
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
                    <TitleItem>Foto</TitleItem>
                    <ImageContainer>
                        <Image source={weatherStation?.image ? {uri: weatherStation.image} : require('../../assets/aty.png')} />
                    </ImageContainer>
                </ItemContainer>

                <ContainerButtons>
                        <Button title={weatherStation?.image ? "Adicionar nova foto" : "Adicionar Foto"} onPress={() => setShowModalImage(true)} color="SECONDARY" />
                        <Button title="Atualizar Estação" onPress={() =>{hasStationChanged() ? UpdateStation() : console.log("Não foi")} } color="PRIMARY" />
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
                            image: data
                        }));
                        setShowModalImage(false)
                    }}
                />
            }

            {
                showModalMantainer &&
                <ModalMantainer
                    showModal={showModalMantainer}
                    onClose={() => {setShowModalMantainer(false)}}
                />
            }

        </Container>
    )
}