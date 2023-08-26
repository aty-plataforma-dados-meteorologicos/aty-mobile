import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../components/Input";

export function Test(){

    function teste(testinho : any){
        console.log(testinho)
    }

    return(
        <View style={styles.container}>
            <Input titleInput="Teste" placeholder="Estou Testando" onChangeTeste={text => teste(text)}/>
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