import React, { useEffect, useState } from "react";
import { BodyModalContent, BodyModalScroll, CloseButton, Container, Header, ModalView, Title } from "./styles";
import { Pressable, Text, View } from "react-native";
import PartnerData from "../../interfaces/partner/PartnerData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "../Input";
import { Button } from "../Button";

type Props = {
    partner? : PartnerData;
    showModal: boolean;
    onSubmit: (data : PartnerData) => void;
    onCloseModal: () => void
}

export function ModalPartners({ partner, showModal, onSubmit, onCloseModal } : Props){
    const defaultPartnerData: PartnerData = {
        name: "",
        cpfOrCnpj: "",
        email: "",
        phone: "",
        site: "",
        notes: "",
        isPublicData: false,
    };
    const [partnerModal, setPartnerModal] = useState<PartnerData>(partner ? {...partner} : defaultPartnerData);

    function handleSendPartner(){
        onSubmit(partnerModal)
        setPartnerModal(defaultPartnerData)
    }

    function handleCloseModal(){
        onCloseModal()
        setPartnerModal(defaultPartnerData)
    }

    useEffect(() => {
        setPartnerModal(partner ? {...partner} : defaultPartnerData);
    }, [partner]);
    

    return(
        <Container
            animationType="slide"
            visible={showModal}
            transparent={true}
        >
            <ModalView>
                <Header>
                    <Title>{partner ? "Editar Parceiro" : "Cadastrar Parceiro"}</Title>
                    <CloseButton onPress={handleCloseModal}>
                        <FontAwesomeIcon icon={faXmark} color="#FFFFFF" size={30} />
                    </CloseButton>
                </Header>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <BodyModalScroll>
                        <BodyModalContent>
                            <Input 
                                titleInput="Nome do Parceiro" 
                                placeholder="Insira o nome do parceiro" 
                                onChangeText={(text) => setPartnerModal(prevState => ({...prevState, name: text}))} 
                                value={partner?.name}/>
                            <Input 
                                titleInput="Email" 
                                placeholder="Insira o email" 
                                onChangeText={(text) => setPartnerModal(prevState => ({...prevState, email: text}))}
                                value={partner?.email}/>
                            <Input 
                                titleInput="CPF/CNPJ" 
                                placeholder="Insira o CPF ou CNPJ" 
                                keyboardType="cpf-cnpj" 
                                onChangeText={(text) => setPartnerModal(prevState => ({...prevState, cpfOrCnpj: text}))}
                                value={partner?.cpfOrCnpj}/>
                            <Input 
                                titleInput="Telefone" 
                                placeholder="Insira o telefone" 
                                keyboardType="phone-pad" 
                                onChangeText={(text) => setPartnerModal(prevState => ({...prevState, phone: text}))}
                                value={partner?.phone}/>
                            <Input 
                                titleInput="Site" 
                                placeholder="Insira o site" 
                                keyboardType="url" 
                                onChangeText={(text) => setPartnerModal(prevState => ({...prevState, site: text}))}
                                value={partner?.site}/>
                            <Input 
                                titleInput="Observação" 
                                placeholder="Insira as observações" 
                                onChangeText={(text) => setPartnerModal(prevState => ({...prevState, notes: text}))}
                                value={partner?.notes}/>
                            <Button title={partner ? "Editar Parceiro" : "Cadastrar Parceiro"} onPress={() => handleSendPartner()} color="PRIMARY" />
                        </BodyModalContent>
                    </BodyModalScroll>
                </KeyboardAwareScrollView>
            </ModalView>
        </Container>
    )
}