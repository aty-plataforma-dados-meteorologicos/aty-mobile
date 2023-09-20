import React from "react"
import { Button, Container, ContainerOne, ContainerPhoto, ContainerSensor, ContainerThree, ContainerTitle, ContainerTwo, Icon, Photo, Subtitle, Title, TitleSensor, VerticalScrollView } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircleInfo, faInfo, faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"
import { Text, View } from "react-native";
import { ManegeInformationCard } from "../ManegeInformationCard";

type Props = {
    title: string,
    subtitle?: string,
    stationType: "Estação Pública" | "Estação Privada",
    sensors?: any[],
    imageUri?: string,
    titleButton: 'Acessar Estação' | 'Solicitar Acesso' | 'Acesso Solicitado',
    showFavorite?: boolean,
    isFavorite?: boolean,
    onPressFavorite?: () => void,
    onPressButton: () => void,
    onPressImage: () => void,
    onPressInfo : (id : number) => void
}


export function StationCardMap({
    title,
    stationType,
    sensors,
    imageUri,
    titleButton,
    showFavorite,
    isFavorite,
    onPressImage,
    onPressButton,
    onPressFavorite,
    onPressInfo
} : Props){

   

    return(
        <Container>
            <ContainerOne>
                <ContainerPhoto onPress={onPressImage}>
                    <Photo source={imageUri ? {uri: imageUri} : require("../../assets/aty.png")}></Photo>
                </ContainerPhoto>
                <ContainerTitle>
                    <Title numberOfLines={2} ellipsizeMode="tail">{title}</Title>
                    <Subtitle>{stationType}</Subtitle>
                </ContainerTitle>
                {showFavorite &&
                    <Icon onPress={onPressFavorite}>
                        <FontAwesomeIcon icon={isFavorite ? faStar : farStar} size={30} color="#FFFFFF" />
                    </Icon>
                }
            </ContainerOne>
            <ContainerTwo>
                <VerticalScrollView showsVerticalScrollIndicator={false}>
                    {sensors &&
                        sensors.map((sensor) => (
                            <ManegeInformationCard
                                key={sensor.id} 
                                title={sensor.name}
                                hideBackground
                                showInfo
                                // onPressInfo={onPressInfo(sensor.id)}
                            />
                            
                        ))
                    }
                </VerticalScrollView>
            </ContainerTwo>
            <ContainerThree>
                <Button onPress={onPressButton}>
                    <Title>{titleButton}</Title>
                </Button>
            </ContainerThree>
        </Container>
    )
}