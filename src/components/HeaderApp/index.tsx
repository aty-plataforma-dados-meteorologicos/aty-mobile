import React from "react"
import { BackContainer, Container, Title, TitleContainer } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faChevronLeft, faLocationCrosshairs, faStream, faTh, faThList } from "@fortawesome/free-solid-svg-icons"
import { TouchableOpacity } from "react-native"

type Props = {
    title: string,
    onMenuPress: () => void,
}

export function HeaderApp({title, onMenuPress} : Props){
    return(
        <Container>
            <BackContainer>
                <TouchableOpacity onPress={onMenuPress}>
                    <FontAwesomeIcon icon={faChevronLeft} color="#FFFFFF" size={30}/>
                </TouchableOpacity>
            </BackContainer>
            <TitleContainer>
                <Title numberOfLines={2} ellipsizeMode='tail'>{title}</Title>
            </TitleContainer>
        </Container>
    )
}