import React from "react";
import { Container, Icon, Title } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onPressInfo: () => void,
    title: string 
}

export function Information({ title, onPressInfo } : Props){
    return(
       <Container>
            <Title numberOfLines={2} ellipsizeMode="tail">{title}</Title>
            <Icon onPress={onPressInfo}>
                <FontAwesomeIcon icon={faCircleInfo} size={25} color="#FFFFFF"/>
            </Icon>
       </Container> 
    )
}