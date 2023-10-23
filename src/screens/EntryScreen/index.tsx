import React, { useEffect } from "react";
import { Container, ContainerButton, ContainerPhoto, ContainerTitle, ImageBackground, Logo, Subtitle, Title } from "./styles";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/UserService";
import { StackType } from "../../interfaces/routes/routs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";


export function EntryScreen(){

    const navigation = useNavigation<StackType>()
    const service = new UserService()

    const handleRegister = () => {
        navigation.navigate('RegisterUser')
    }

    const handleLogin = () => {
        navigation.navigate('Login')
    }

    useEffect(() => {
        const checkToken = async () => {
          const userToken = await AsyncStorage.getItem('userToken');
          if (userToken) {
            const { tokenExpiration } = JSON.parse(userToken);
            const isTokenExpired = moment().isAfter(tokenExpiration);
    
            if (!isTokenExpired) {
              navigation.navigate('Home');
            } else {
              const isRefreshed = await service.refreshToken();
              if (isRefreshed) {
                navigation.navigate('Home');
              }
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