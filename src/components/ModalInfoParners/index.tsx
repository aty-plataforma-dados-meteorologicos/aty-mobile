import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { BodyModalContent, CloseButton, Container, Header, InfoPartner, ModalView, Title } from "./styles";
import PartnerData from "../../interfaces/partner/PartnerData";

type Props = {
    onClose: (event : any) => void
    partnerInfo: PartnerData
    showModal: boolean;
}


export function ModalInfoPartner({ onClose, partnerInfo, showModal } : Props){
    return(
        <Container
            animationType="slide"
            visible={showModal}
            transparent={true}
        >
            <ModalView>
                <Header>
                    <Title>Parceiro</Title>
                    <CloseButton onPress={onClose}>
                        <FontAwesomeIcon icon={faTimes} size={25} color="#FFFFFF" />
                    </CloseButton>   
                </Header>
                <BodyModalContent>
                    <InfoPartner>Nome: {partnerInfo.name ? partnerInfo.name : "Parceiro sem nome"}</InfoPartner>
                    <InfoPartner>Email: {partnerInfo.email ? partnerInfo.email : "Parceiro sem email"}</InfoPartner>
                    <InfoPartner>Contato: {partnerInfo.phone ? partnerInfo.phone : "Parceiro sem contato"}</InfoPartner>
                    <InfoPartner>Site: {partnerInfo.site ? partnerInfo.site : "Parceiro sem site"}</InfoPartner>
                    <InfoPartner>Notas: {partnerInfo.notes ? partnerInfo.notes : "Parceiro sem notas"}</InfoPartner>
                </BodyModalContent>
            </ModalView>
        </Container>
    )
}