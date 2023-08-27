import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../components/Input";
import { HeaderApp } from "../../components/HeaderApp";
import { StationCard } from "../../components/StationCard";
import { Information } from "../../components/Information";
import { ListEmpty } from "../../components/ListEmpty";

export function Test(){

    function teste(){
        console.log("teste")
    }

    return(
        <View style={styles.container}>
            {/* <Input titleInput="Teste" onChangeTeste={text => teste(text)} keyboardType="default"/> */}
            {/* <HeaderApp title="Teste" onMenuPress={teste} /> */}
            {/* <StationCard title="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " subtitle="Subtitulo Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " onPressPhoto={teste} onPressIcon={teste} /> */}
            {/* <Information title="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " onPressInfo={teste} /> */}
            <ListEmpty message="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " />
        </View>
    )
}

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    component : {
      flex: 1,
      width: '100%'
    } 
  })