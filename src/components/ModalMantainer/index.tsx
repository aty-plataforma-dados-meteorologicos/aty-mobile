import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SensorData from "../../interfaces/sensor/SensorData";
import { BodyModalContent, CloseButton, Container, Header, InfosSensor, ModalView, Title } from "./styles";
import { Input } from "../Input";
import { Button } from "../Button";

type Props = {
    onClose: (event : any) => void
    showModal: boolean;
}


export function ModalMantainer({ onClose, showModal } : Props){
    const [email, setEmail] = useState<string>("");

    return(
        <Container
            animationType="slide"
            visible={showModal}
            transparent={true}
        >
            <ModalView>
                <Header>
                    <Title>Adicionar Mantenedor</Title>
                    <CloseButton onPress={onClose}>
                        <FontAwesomeIcon icon={faTimes} size={25} color="#FFFFFF" />
                    </CloseButton>   
                </Header>
                <BodyModalContent>
                    <Input placeholder="Insira o email" onChangeText={(text) => setEmail(text)} />
                    <Button title="Adicionar" onPress={() => {console.log(email)}} color="PRIMARY" />
                </BodyModalContent>
            </ModalView>
        </Container>
    )
}