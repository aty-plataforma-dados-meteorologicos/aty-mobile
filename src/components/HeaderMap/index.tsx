import React from "react"
import { Container, LocationContainer, MenuContainer, Title, TitleContainer } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faLocationCrosshairs, faStream, faTh, faThList } from "@fortawesome/free-solid-svg-icons"
import { TouchableOpacity } from "react-native"

type Props = {
    onMenuPress: () => void,
    onLocationPress: () => void
}

export function HeaderMap({onMenuPress, onLocationPress} : Props){
    return(
        <Container>
            <MenuContainer>
                <TouchableOpacity onPress={onMenuPress}>
                    <FontAwesomeIcon icon={faBars} color="#FFFFFF" size={30}/>
                </TouchableOpacity>
            </MenuContainer>
            <TitleContainer>
                <Title>Estações Meteorológicas</Title>
            </TitleContainer>
            <LocationContainer>
                <TouchableOpacity onPress={onLocationPress}>
                        <FontAwesomeIcon icon={faLocationCrosshairs} color="#FFFFFF" size={30}/>
                    </TouchableOpacity>
                </LocationContainer>
        </Container>
    )
}