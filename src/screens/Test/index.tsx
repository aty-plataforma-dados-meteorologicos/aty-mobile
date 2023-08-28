import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../components/Input";
import { HeaderApp } from "../../components/HeaderApp";
import { StationCard } from "../../components/StationCardList";
import { ListEmpty } from "../../components/ListEmpty";
import { ManegePeopleCard } from "../../components/ManegeInformationCard";
import { ModalImage } from "../../components/ModalImage";
import { StationCardMap } from "../../components/StationCardMap";

export function Test(){

    function teste(teste : string){
        console.log(teste)
    }

    return(
        <View style={styles.container}>
            {/* <Input titleInput="Testezin" onChangeTeste={text => teste(text)} keyboardType="cpf-cnpj"/> */}
            {/* <HeaderApp title="Teste" onMenuPress={teste} /> */}
            {/* <StationCard title="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " subtitle="Subtitulo Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " onPressPhoto={teste} onPressIcon={teste} /> */}
            {/* <ListEmpty message="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " /> */}
            {/* <ManegePeopleCard title="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " email="Email teste Email teste Email teste Email teste Email teste Email teste Email teste Email teste Email teste Email teste " showInfo onPressEdit={teste} onPressDelete={teste}/> */}
            {/* <ModalImage isOpen onClose={teste} /> */}
            <StationCardMap />
        </View>
    )
}

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    component : {
      flex: 1,
      width: '100%'
    } 
  })