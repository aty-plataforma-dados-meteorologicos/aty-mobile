import React, { useEffect, useState } from "react";
import { Container, ContainerButton, ContainerInput, ContainerPhoto, ContainerTitle, ImageBackground, Logo, Subtitle, TimerText, Title, TitlePassword } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserData } from "../../interfaces/user/UserData";
import { text } from "stream/consumers";
import UserService from "../../services/UserService";
import { useNavigation } from "@react-navigation/native";
import { StackType } from "../../interfaces/routes/routs";
import Toast from "react-native-toast-message";



export function ResetPassword(){
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [code, setCode] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isRequestCode, setIsRequestCode] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(30)
    const service = new UserService()
    const navigation = useNavigation<StackType>()

    async function requestCode() {
        setIsLoading(true)
        
        if (email) {
            const response = await service.requestCodeResetPassword(email);
            if(response == true){
                setIsLoading(false)
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
            setIsLoading(false)
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

        setIsLoading(false)
    }

    async function resetPassword() {
        setIsLoading(true)
        if (email && code && password) {
            const response = await service.resetPassword(email, password, code);
            if(response == true){
                setIsLoading(false)
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Sucesso',
                    text2: 'Senha alterada com sucesso.',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 40,
                })
                navigation.navigate('Login')
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
            setIsLoading(false)
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
        setIsLoading(false)
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
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <ImageBackground source={require("../../assets/fundo-2.png")} resizeMode="cover"/>
                <ContainerPhoto>
                    <Logo source={require("../../assets/aty.png")} />
                </ContainerPhoto>
                {!isRequestCode && (
                    <>
                    <ContainerTitle>
                        <Title>Bem-vindos ao ATY</Title>
                        <Subtitle>Insira seu email para redefinir sua senha</Subtitle>
                    </ContainerTitle>
                        <ContainerInput>
                            <Input placeholder="Email" onChangeText={(text : string) => setEmail(text)} />
                        </ContainerInput>
                        <ContainerButton>
                            <Button title="Solicitar código" color="PRIMARY" onPress={requestCode} isLoading={isLoading}/>
                        </ContainerButton>
                    </>
                )}
                {isRequestCode && (
                    <>
                    <ContainerTitle>
                        <Title>Bem-vindos ao ATY</Title>
                        <Subtitle>Insira seu código e sua nova senha</Subtitle>
                    </ContainerTitle>
                        <ContainerInput>
                        <Input
                            keyboardType="num"
                            placeholder="Código" 
                            onChangeText={(text : string) => setCode(convertToNumber(text))} />
                        <Input 
                            placeholder="Insira a nova senha" 
                            onChangeText={(text : string) => setPassword(text)} 
                            onBlur={() => handlePasswordBlur('password')}
                            secureTextEntry/>
                        </ContainerInput>
                        <ContainerButton>
                            <Button title="Cadastrar nova senha" color="PRIMARY" onPress={resetPassword}/>
                            {isRequestCode && timer > 0 && (
                                <TimerText>{timer} segundos restantes para solicitar um novo código</TimerText>
                            )}
                            {isRequestCode && timer === 0 && (
                                <Button title="Solicitar novo código" color="SECONDARY" onPress={requestCode} isLoading={isLoading}/>
                            )}
                        </ContainerButton>
                    </>
                )}
            </Container>
        </KeyboardAwareScrollView>
    )
}