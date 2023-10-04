import React from "react"
import { BackContainer, Container, Title, TitleContainer } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBars, faChevronLeft, faLocationCrosshairs, faStream, faTh, faThList } from "@fortawesome/free-solid-svg-icons"
import { TouchableOpacity } from "react-native"

type Props = {
    title: string,
    onMenuPress: () => void,
}

// Header utilizado pelo resto da estação. O title sinaliza o usuário em qual tela ele está. EX: "Minhas Estações", "Estações com Acesso", "Estação 1".
// Tambem tem o botão de voltar, que deve sempre voltar para tela anterior, salvo alguns casos que são relacionados com cadastro que deve voltar
// para a tela inicial do aplicativo (tela de mapas).

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