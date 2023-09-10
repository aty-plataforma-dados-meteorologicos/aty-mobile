import React from "react";
import { ButtonContainer, ButtonTitle } from "./styles";

type Props = {
    title: string,
    onPress: () => void,
    color: "PRIMARY" | "SECONDARY"
}

export function Button({ title, onPress, color } : Props){
    return(
        <ButtonContainer onPress={onPress} color={color} >
            <ButtonTitle>{title}</ButtonTitle>
        </ButtonContainer>
    )
}