import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../components/Input";
import { HeaderApp } from "../../components/HeaderApp";

export function Test(){

    function teste(){
        console.log("teste")
    }

    return(
        <View style={styles.container}>
            {/* <Input titleInput="Teste" onChangeTeste={text => teste(text)} keyboardType="default"/> */}
            <HeaderApp title="Teste" onMenuPress={teste} />
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