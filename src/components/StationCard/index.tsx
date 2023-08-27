import React from "react";
import { Container, Icon, Photo, PhotoContainer, Subtitle, Title, TitleContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onPressPhoto: () => void,
    onPressIcon: () => void,
    title: string,
    subtitle: string
}

export function StationCard({ onPressPhoto, onPressIcon, title, subtitle } : Props){
    return(
        <Container>
            <PhotoContainer onPress={onPressPhoto}>
                <Photo source={require('../../assets/aty.png')}></Photo>
            </PhotoContainer>
            <TitleContainer>
                <Title numberOfLines={2} ellipsizeMode='tail'>{title}</Title>
                <Subtitle numberOfLines={2} ellipsizeMode='tail'>{subtitle}</Subtitle>
            </TitleContainer>
            <Icon onPress={onPressIcon}>
                <FontAwesomeIcon icon={faChevronRight} color="#FFFFFF" size={30}/>
            </Icon>
        </Container>
    )
}