import React from "react"
import { Button, Container, ContainerOne, ContainerPhoto, ContainerThree, ContainerTitle, ContainerTwo, Icon, Photo, Subtitle, Title, TitleSensor, VerticalScrollView } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Text, View } from "react-native";
import { ManegeInformationCard } from "../ManegeInformationCard";

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


export function StationCardMap(){

   

    return(
        <Container>
            <ContainerOne>
                <ContainerPhoto>
                    <Photo source={require('../../assets/aty.png')}></Photo>
                </ContainerPhoto>
                <ContainerTitle>
                    <Title>Estações Meteorológicas</Title>
                    <Subtitle>Latitude - Longitude - Altura</Subtitle>
                </ContainerTitle>
                <Icon>
                    <FontAwesomeIcon icon={faStar} size={30} color="#FFFFFF" />
                </Icon>
            </ContainerOne>
            <ContainerTwo>
                <VerticalScrollView>
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                    <ManegeInformationCard title="Sensor 1" showInfo />
                </VerticalScrollView>
            </ContainerTwo>
            <ContainerThree>
                <Button>
                    <Title>Acessar Estação</Title>
                </Button>
            </ContainerThree>
        </Container>
    )
}