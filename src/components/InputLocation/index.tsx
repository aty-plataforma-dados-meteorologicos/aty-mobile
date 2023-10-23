import React from "react";
import { Container, InputContainer, InputText, Title } from "./styles";

type Props = {
    titleInput?: string,
    placeholder?: string,
    onBlur?: () => void,
    value?: any
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
                value={value}
            />
            </InputContainer>
        </Container>
    )
}