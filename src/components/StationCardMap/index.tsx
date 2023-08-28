import React from "react"
import { Container, ContainerOne, ContainerTitle, ContainerTwo, Icon, ListSensor, Photo, Subtitle, Title, TitleSensor } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Text, View } from "react-native";

const DATA = [
    {
        id: 1,
        nome: "DATA"
    },
    {
        id: 2,
        nome: "DATA"
    }
]

const Item = (title : any) => (
    <View>
        <Text>{title}</Text>
    </View>
);


export function StationCardMap(){

   

    return(
        <Container>
            <ContainerOne>
                <Photo source={require('../../assets/aty.png')}></Photo>
                <ContainerTitle>
                    <Title>Estações Meteorológicas</Title>
                    <Subtitle>Latitude - Longitude - Altura</Subtitle>
                </ContainerTitle>
                <Icon>
                    <FontAwesomeIcon icon={faStar} size={30} color="#FFFFFF" />
                </Icon>
            </ContainerOne>
            <ContainerTwo>
                <ListSensor
                    data={DATA}
                    renderItem={({item} : {item : any}) => <Item title={item.nome} />}
                />
            </ContainerTwo>
        </Container>
    )
}