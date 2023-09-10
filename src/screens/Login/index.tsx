import React, { useState } from "react";
import { Container, ContainerButton, ContainerInput, ContainerPhoto, ContainerTitle, ImageBackground, Logo, Subtitle, Title, TitlePassword } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserData } from "../../interfaces/user/UserData";
import { text } from "stream/consumers";
import UserService from "../../services/UserService";
import { useNavigation } from "@react-navigation/native";



export function Login(){
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const service = new UserService()
    const navigation = useNavigation()

    async function handleLogin() {
            const user = {
                "email" : email,
                "password" : password
            }
            const response = await service.login(user)
            if(response == true){
                navigation.navigate('DrawerRoutes')
            }
    }

    const handleForgetPassword = () => {
        console.log("Esqueceu a senha")
    }



    return(
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
            <ImageBackground source={require("../../assets/fundo-2.png")} resizeMode="cover"/>
            <ContainerPhoto>
                <Logo source={require("../../assets/aty.png")} />
            </ContainerPhoto>
            <ContainerTitle>
                <Title>Bem-vindos ao ATY</Title>
                <Subtitle>Insira seu email e senha para entrar</Subtitle>
            </ContainerTitle>
            <ContainerInput>
                <Input placeholder="Email" onChangeTeste={(text : string) => setEmail(text)} />
                <Input placeholder="Senha" onChangeTeste={(text : string) => setPassword(text)} secureTextEntry/>
            </ContainerInput>
            <ContainerButton>
                <Button title="Entrar" color="PRIMARY" onPress={handleLogin} />
                <TouchableOpacity onPress={handleForgetPassword}>
                    <TitlePassword>Esqueci minha senha</TitlePassword>
                </TouchableOpacity>
            </ContainerButton>
        </Container>
        </KeyboardAwareScrollView>
    )
}