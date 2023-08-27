import React from "react";
import { Container, Message } from "./styles";

type Props = {
    message: string
}

export function ListEmpty({ message} : Props){
    return(
        <Container>
            <Message numberOfLines={4} ellipsizeMode="tail">{message}</Message>
        </Container>
    )
}