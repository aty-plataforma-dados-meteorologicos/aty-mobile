import React from "react";
import { Container, InputContainer, InputText, Title } from "./styles";

type Props = {
    titleInput?: string,
    placeholder?: string,
    onBlur?: () => void,
    value?: string
    onChangeText: (text: string) => void
}

export function InputLocation({titleInput, placeholder, value, onChangeText, onBlur } : Props){

    return(
        <Container>
            {titleInput && <Title>{titleInput}</Title>}
            <InputContainer>
            <InputText 
                placeholder={placeholder}
                onChangeText={(value) => onChangeText(value)}
                onBlur={onBlur}
            />
            </InputContainer>
        </Container>
    )
}