import { useNavigation } from "@react-navigation/native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderApp } from "../../components/HeaderApp";
import { Input } from "../../components/Input";
import { Container, FormContainer } from "./styles";


export function PerfilEdit() {

    const navigate = useNavigation();
    
    function handleBack() {
        (navigate.navigate as any)('Home')
    }

    return(
        <Container>
            <Container>
            <HeaderApp title="Cadastrar Estação" onMenuPress={handleBack}/>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FormContainer>
                    <Input 
                        titleInput="Nome" 
                        placeholder="Nome do Usuário"
                        onChangeTeste={handleBack}
                    />

                    <Input
                        onChangeTeste={handleBack} 
                        titleInput="Senha" 
                        placeholder="Digite a nova senha"
                    />
                </FormContainer>
            </KeyboardAwareScrollView>
        </Container>
        </Container>
    )
}