import React from "react";
import { Container, InputText, Title } from "./styles";

type Props = {
    titleInput?: string,
    placeholder: string,
    onChangeTeste: (text: string) => void
}

export function Input({titleInput, placeholder, onChangeTeste} : Props){
    return(
        <Container>
            {titleInput && <Title>{titleInput}</Title>}
            <InputText placeholder={placeholder} onChangeText={text => onChangeTeste(text)}>
            </InputText>
        </Container>
    )
}