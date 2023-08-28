import React from "react";
import { Container, Message } from "./styles";

type Props = {
    message: string
}

// Componente responsável por informar alguma listagem vazia. Possui apenas um campo de mensagem para ser notificado ao usuário.

export function ListEmpty({ message} : Props){
    return(
        <Container>
            <Message numberOfLines={4} ellipsizeMode="tail">{message}</Message>
        </Container>
    )
}