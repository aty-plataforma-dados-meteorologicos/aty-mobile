import React from "react";
import { ButtonContainer, ButtonTitle } from "./styles";
import { ActivityIndicator } from "react-native";

type Props = {
    title: string,
    onPress: () => void,
    color: "PRIMARY" | "SECONDARY"
    isLoading?: boolean
}

export function Button({ title, isLoading, onPress, color } : Props){
    return(
        <ButtonContainer onPress={onPress} color={color} >
            {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <ButtonTitle>{title}</ButtonTitle>
            )}
        </ButtonContainer>
    )
}