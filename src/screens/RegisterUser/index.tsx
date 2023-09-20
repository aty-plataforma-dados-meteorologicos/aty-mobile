import React, { useState } from "react";
import { Container, ContainerButton, ContainerInput, ContainerPhoto, ContainerTitle, ImageBackground, Logo, Subtitle, Title, TitlePassword } from "./styles";
import { Input } from "../../components/Input";
import { UserData } from "../../interfaces/user/UserData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioCheck } from "../../components/RadioCheck";
import { Button } from "../../components/Button";
import { Alert } from "react-native";
import UserService from "../../services/UserService";
import { useNavigation } from "@react-navigation/native";


export function RegisterUser(){
    const [user, setUser] = useState<UserData>({
        name: null,
        email: null,
        password: null,
        passwordRepeat: null,
        role: 'client',
        type: null
      })
      const [isloading, setIsLoading] = useState<boolean>(false);
      const service = new UserService();
      const navigation = useNavigation();
      

      const typeUser = [
        {"name": "Pessoa Física", "value": 10},
        {"name": "Instituição Pública", "value": 20},
        {"name": "Instituição Privada", "value": 30},
        {"name": "Outros", "value": 40}
    ]

      function handleInputChange(field: keyof UserData, value: string | any) {
        setUser(prevState => ({
          ...prevState,
          [field]: value
        }));
      }

      

      function validatePassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
      }

      function handlePasswordBlur(field: string) {
        const passwordValue = user[field as keyof UserData];
        if (passwordValue && passwordValue != null && !validatePassword(passwordValue)) {
          Alert.alert("Atenção", "A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.");
        }
      }

      function validateUser(userValidate : UserData): boolean {
        const { name, email, password, passwordRepeat, role, type } = userValidate;
      
        if (!name || !email || !password || !passwordRepeat || !role || !type) {
          Alert.alert("Atenção", "Todos os campos devem ser preenchidos");
          return false;
        }
        return true;
      }

      

    async function handleLogin(){
        console.log("USUARIO", user)
        setIsLoading(true)
        const validate = validateUser(user)

        try {
            if(validate){
                const { passwordRepeat, ...userWithoutPasswordRepeat } = user;
                const response = await service.createUser(userWithoutPasswordRepeat)
                console.log(response)
                if(response){
                    Alert.alert(
                        'Cadastro realizado', 
                        'Seu cadastro foi realizado com sucesso.', 
                        [
                          {text: 'OK', onPress: () => (navigation.navigate as any)('Login')}
                        ]
                      );
                }
            }
        } catch (error) {
            setIsLoading(false)
            Alert.alert("Erro ao criar usuário", "Não foi possivel criar usuário, verifique os campos novamente")
        }
    }

    return(
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                <ImageBackground source={require("../../assets/fundo-2.png")} resizeMode="cover"/>
                <ContainerPhoto>
                    <Logo source={require("../../assets/aty.png")} />
                </ContainerPhoto>
                <ContainerTitle>
                    <Title>Bem-vindo ao ATY</Title>
                    <Subtitle>Cadastre-se na plataforma</Subtitle>
                </ContainerTitle>
                <ContainerInput>
                    <Input titleInput="Nome" placeholder="Insira o nome" onChangeTeste={(text) => handleInputChange('name', text)}/>
                    <Input titleInput="Email" placeholder="Insira o email" onChangeTeste={(text) => handleInputChange('email', text)}/>
                    <Input titleInput="Senha" placeholder="Insira o senha" onChangeTeste={(text) => handleInputChange('password', text)} onBlur={() => handlePasswordBlur('password')} secureTextEntry/>
                    <Input titleInput="Repita a senha" placeholder="Insira a senha novamente" onChangeTeste={(text) => handleInputChange('passwordRepeat', text)} onBlur={() => handlePasswordBlur('passwordRepeat')} secureTextEntry/>
                    <RadioCheck titleInput="Tipo do Usuário" arrayText={typeUser} onClick={(value) => handleInputChange('type', value)} isCheck={user.type} />
                </ContainerInput>
                <ContainerButton>
                    <Button title="Cadastrar" color="PRIMARY" onPress={handleLogin} isLoading={isloading} />
                </ContainerButton>
            </Container>
        </KeyboardAwareScrollView>
    )
}