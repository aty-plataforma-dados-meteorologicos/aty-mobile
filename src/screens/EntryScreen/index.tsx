import React, { useEffect } from "react";
import { Container, ContainerButton, ContainerPhoto, ContainerTitle, ImageBackground, Logo, Subtitle, Title } from "./styles";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";


export function EntryScreen(){

    const navigation = useNavigation()
    const service = new UserService()

    const handleRegister = () => {
        (navigation.navigate as any)('RegisterUser')
    }

    const handleLogin = () => {
        (navigation.navigate as any)('Login')
    }

    useEffect(() => {
        const checkToken = async () => {
          const userToken = await AsyncStorage.getItem('userToken');
          if (userToken) {
            const { tokenExpiration } = JSON.parse(userToken);
            const isTokenExpired = moment().isAfter(tokenExpiration);
    
            if (!isTokenExpired) {
              (navigation.navigate as any)('Home');
            } else {
              const isRefreshed = await service.refreshToken();
              if (isRefreshed) {
                (navigation.navigate as any)('Home');
              }
              // Nada acontece se for false
            }
          }
        };
    
        checkToken();
      }, []);

    return(
        <Container>
            <ImageBackground source={require("../../assets/fundo-1.png")}  resizeMode="cover"/>
            <ContainerPhoto>
                <Logo source={require("../../assets/aty.png")} />
            </ContainerPhoto>
            <ContainerTitle>
                <Title>Bem-vindos ao ATY</Title>
                <Subtitle>Uma plataforma de gerenciamento de estações meteorológicas</Subtitle>
            </ContainerTitle>
            <ContainerButton>
                <Button title="Cadastre-se" color="PRIMARY" onPress={handleRegister} />
                <Button title="Entrar" color="PRIMARY" onPress={handleLogin} />
            </ContainerButton>
        </Container>
    )
}