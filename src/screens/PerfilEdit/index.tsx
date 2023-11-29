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
import { Buffer } from 'buffer'
import { Alert } from "react-native";
import { StackType } from "../../interfaces/routes/routs";


export function PerfilEdit() {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [code, setCode] = useState<number>()
    const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false)
    const [isLoadingResetPassword, setIsLoadingResetPassword] = useState<boolean>(false)
    const [isRequestCode, setIsRequestCode] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const service = new UserService()
    const navigate = useNavigation<StackType>();
    
    async function handleRequestCode() {
        setIsLoadingCode(true)
        if (email) {
            const response = await service.requestCodeResetPassword(email);
            if(response == true){
                setIsLoadingCode(false)
                setTimer(30)
                setIsRequestCode(true);
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Sucesso',
                    text2: 'Código enviado no email',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 40,
                })
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

    async function handleResetPassword() {
        setIsLoadingResetPassword(true)
        if (email && code && password) {
            const response = await service.resetPassword(email, password, code);
            if(response == true){
                setIsLoadingResetPassword(false)
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Sucesso',
                    text2: 'Senha alterada com sucesso.',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 40,
                })
                setEmail(undefined)
                setCode(undefined)
                navigate.navigate('Home')
            } else {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro ao alterar senha',
                    text2: 'Verifique o código e tente novamente.',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 40,
                })
            }
        } else {
            setIsLoadingResetPassword(false)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'Código ou senha não informados.',
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 40,
            })
        }
        setIsLoadingResetPassword(false)
    }
    
    async function getUserEmail(){
        const token = await AsyncStorage.getItem('userToken');
        const tokenJson = JSON.parse(token || '{}');
        const tokenObject = parseJwt(tokenJson.token)
        setEmail(tokenObject.email)
    }
    
    function parseJwt(token : string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeBase64(base64);
            
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error decoding token: ", e);
            return null;
        }
    }
    
    function decodeBase64(str : string){
        return Buffer.from(str, 'base64').toString('binary');
    }

    function validatePassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    function handlePasswordBlur(field: string) {
        const passwordValue = password;
        if (passwordValue && passwordValue != null && !validatePassword(passwordValue)) {
          Alert.alert("Atenção", "A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.");
        }
    }

    function convertToNumber(str : string) {
        const numericString = str.replace(/\D/g, '');
        return numericString ? parseInt(numericString, 10) : null;
    }
    
    function handleBack() {
        (navigate.navigate as any)('Home')
    }

    useEffect(() => {
        setIsLoadingResetPassword(false)
        getUserEmail()
    }
    , [])

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRequestCode && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRequestCode, timer]);

    return(
        <Container>
            <Container>
            <HeaderApp title="Perfil" onMenuPress={handleBack}/>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FormContainer>
                    <Input
                        titleInput="Código"
                        keyboardType="num"
                        placeholder="Insira o código de verificação" 
                        onChangeText={(text : string) => setCode(convertToNumber(text))}
                        value={code ? code.toString() : undefined}
                        />
                    <Input
                        titleInput="Nova Senha" 
                        placeholder="Insira a nova senha" 
                        onChangeText={(text : string) => setPassword(text)} 
                        onBlur={() => handlePasswordBlur('password')}
                        value={password ? password : undefined}
                        secureTextEntry
                        />
                </FormContainer>
                
                <ContainerButton>
                {timer === 0 && (
                    <Button title="Solicitar código" color="SECONDARY" onPress={handleRequestCode} isLoading={isLoadingCode}/>
                )}

                {timer > 0 && (
                    <TimerText>{timer} segundos restantes para solicitar um novo código</TimerText>
                )}
                    <Button title="Atualizar Senha" color="PRIMARY" onPress={handleResetPassword} isLoading={isLoadingResetPassword} />
                </ContainerButton>

            </KeyboardAwareScrollView>
        </Container>
        </Container>
    )
}