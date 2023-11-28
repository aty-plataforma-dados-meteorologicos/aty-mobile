import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderApp } from "../../components/HeaderApp";
import { Input } from "../../components/Input";
import { Container, ContainerButton, FormContainer, TimerText } from "./styles";
import { Button } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../../services/UserService";
import Toast from "react-native-toast-message";


export function PerfilEdit() {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [code, setCode] = useState<number>()
    const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false)
    const [isLoadingResetPassword, setIsLoadingResetPassword] = useState<boolean>(false)
    const [isRequestCode, setIsRequestCode] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const service = new UserService()

    async function handleEditPerfil() {
        setIsLoadingResetPassword(false)
    }
    
    const navigate = useNavigation();
    
    function handleBack() {
        (navigate.navigate as any)('Home')
    }

    async function getUser(){
        const token = await AsyncStorage.getItem('userToken');
        const tokenJson = JSON.parse(token || '{}');
        const email = parseJwt(tokenJson.token.tostring())
        console.log("email" + email)
    }

    async function requestCode() {
        setIsLoadingCode(true)
        if (email) {
            const response = await service.requestCodeResetPassword(email);
            if(response == true){
                setIsLoadingCode(false)
                setTimer(30)
                setIsRequestCode(true);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro ao solicitar código',
                    text2: 'Verifique o email e tente novamente.',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 40,
                })
            }
        } else {
            setIsLoadingCode(false)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'Email não informado.',
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 40,
            })
        }
        setIsLoadingCode(false)
    }

    function parseJwt(token : string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Erro na decodificação do JWT: ", e);
            return null;
        }
    }

    useEffect(() => {
        setIsLoadingResetPassword(false)
        getUser()
    }
    , [])

    return(
        <Container>
            <Container>
            <HeaderApp title="Perfil" onMenuPress={handleBack}/>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FormContainer>
                    <Input
                        onChangeText={handleBack} 
                        titleInput="Código" 
                        placeholder="Digite o código"
                    />
                    <Input
                        onChangeText={handleBack} 
                        titleInput="Senha" 
                        placeholder="Digite a nova senha"
                    />
                </FormContainer>

                {timer > 0 && (
                    <TimerText>{timer} segundos restantes para solicitar um novo código</TimerText>
                )}
                <ContainerButton>
                {timer === 0 && (
                    <Button title="Solicitar novo código" color="SECONDARY" onPress={requestCode} isLoading={isLoadingCode}/>
                )}
                    <Button title="Atualizar Perfil" color="PRIMARY" onPress={handleEditPerfil} isLoading={isLoadingResetPassword} />
                </ContainerButton>

            </KeyboardAwareScrollView>
        </Container>
        </Container>
    )
}