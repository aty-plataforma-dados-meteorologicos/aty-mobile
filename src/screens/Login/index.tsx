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
import { StackType } from "../../interfaces/routes/routs";



export function Login(){
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const service = new UserService()
    const navigation = useNavigation<StackType>()

    async function handleLogin() {
            const user = {
                "email" : email,
                "password" : password
            }
            setIsLoading(true)
            try {
                const response = await service.login(user)
                if(response == true){
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}]
                    })
                }
            } catch (error) {
                console.log(error)
                Alert.alert(
                    'Falha no login',
                    'Verifique o email/senha'
                )
                setIsLoading(false)
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
                    <Input placeholder="Email" onChangeText={(text : string) => setEmail(text)} />
                    <Input placeholder="Senha" onChangeText={(text : string) => setPassword(text)} secureTextEntry/>
                </ContainerInput>
                <ContainerButton>
                    <Button title="Entrar" color="PRIMARY" onPress={handleLogin} isLoading={isLoading} />
                    <TouchableOpacity onPress={handleForgetPassword}>
                        <TitlePassword>Esqueci minha senha</TitlePassword>
                    </TouchableOpacity>
                </ContainerButton>
            </Container>
        </KeyboardAwareScrollView>
    )
}