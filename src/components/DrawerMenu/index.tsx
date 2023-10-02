import React from "react";
import { Container, HeaderContainer, Icon, IconsContainer, Image, SubtitleApp, TitleApp, TitleIcon } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faFileCirclePlus, faHome, faLock, faRightFromBracket, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";


export function DrawerMenu(){
    const navigate = useNavigation();

    return(
        <Container>
            <HeaderContainer>
                <Image source={require('../../assets/aty.png')} />
                <TitleApp>ATY</TitleApp>
                <SubtitleApp>Plataforma de Gerenciamento de Estações Meteorológicas</SubtitleApp>
            </HeaderContainer>
            <IconsContainer>
                <Icon onPress={() => (navigate.navigate as any)('Home')}>
                    <FontAwesomeIcon icon={faHome} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Página Inicial</TitleIcon>
                </Icon>
                <Icon onPress={() => (navigate.navigate as any)('RegisterStation')}>
                    <FontAwesomeIcon icon={faFileCirclePlus} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Cadastrar Estação</TitleIcon>
                </Icon>
                <Icon onPress={() => (navigate.navigate as any)('MantainerStations')}>
                    <FontAwesomeIcon icon={faBookmark} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Minhas Estações</TitleIcon>
                </Icon>
                <Icon onPress={() => (navigate.navigate as any)('FavoriteStations')}>
                    <FontAwesomeIcon icon={faStar} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Estações Favoritas</TitleIcon>
                </Icon>
                <Icon onPress={() => (navigate.navigate as any)('AcessStations')}>
                    <FontAwesomeIcon icon={faLock} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Estações com Acesso</TitleIcon>
                </Icon>
                <Icon onPress={() => (navigate.navigate as any)('Profile')}>
                    <FontAwesomeIcon icon={faUser} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Perfil</TitleIcon>
                </Icon>
                <Icon onPress={() => (navigate.navigate as any)('Exit')}>
                    <FontAwesomeIcon icon={faRightFromBracket} size={35} color={'#FFFFFF'} />
                    <TitleIcon>Sair</TitleIcon>
                </Icon>
            </IconsContainer>
        </Container>
    )
}