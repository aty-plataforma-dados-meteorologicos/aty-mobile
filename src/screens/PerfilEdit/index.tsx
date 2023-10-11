import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderApp } from "../../components/HeaderApp";
import { Input } from "../../components/Input";
import { Container, ContainerButton, FormContainer } from "./styles";
import { Button } from "../../components/Button";


export function PerfilEdit() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleEditPerfil() {
        setIsLoading(false)
        console.log("Jiujigson")
    }
    
    const navigate = useNavigation();
    
    function handleBack() {
        (navigate.navigate as any)('Home')
    }

    return(
        <Container>
            <Container>
            <HeaderApp title="Perfil" onMenuPress={handleBack}/>
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

                <ContainerButton>
                    <Button title="Atualizar Perfil" color="PRIMARY" onPress={handleEditPerfil} isLoading={isLoading} />
                </ContainerButton>

            </KeyboardAwareScrollView>
        </Container>
        </Container>
    )
}