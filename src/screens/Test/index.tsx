import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../components/Input";
import { HeaderApp } from "../../components/HeaderApp";
import { StationCard } from "../../components/StationCardList";
import { ListEmpty } from "../../components/ListEmpty";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import { ModalImage } from "../../components/ModalImage";
import { StationCardMap } from "../../components/StationCardMap";

export function Test(){

    const [favorite, setFavorite] = useState(false);
    const [openPicture, setOpenPicture] = useState(false)
    const [check, setCheck] = useState(false)

    function teste(){
        console.log("teste")
    }

    const sensores = [
        {
            id: 1,
            nome: "Sensor 1"
        },
        {
            id: 2,
            nome: "Sensor 2"
        },

    ]

    function pressFavorite(){
        if(favorite === false){
            setFavorite(true)
        } else {
            setFavorite(false)
        }
        console.log(favorite)
    }

    function pressInfo(id : number){
        console.log(id)
        console.log(favorite)
    }

    function handleCheck(){
        if(check == false){
            setCheck(true)
        } else {
            setCheck(false)
        }
    }

    function handleInput(text : string){
        console.log(text)
    }

    return(
        <View style={styles.container}>
            <Input titleInput="Testezin" placeholder="Digite sua senha" onChangeTeste={text => handleInput(text)} keyboardType="default" secureTextEntry/>
            {/* <HeaderApp title="Teste" onMenuPress={teste} /> */}
            {/* <StationCard title="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " subtitle="Subtitulo Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " onPressPhoto={teste} onPressIcon={teste} /> */}
            {/* <ListEmpty message="Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste " /> */}
            {/* <ManegeInformationCard title="Sensor 1" showInfo showCheck isCheck={check} onPressCheck={handleCheck}/> */}
            {/* {openPicture && 
                <ModalImage isOpen={openPicture} onClose={() => setOpenPicture(false)} />
            } */}
            {/* <StationCardMap 
                title="Estação Meteorológica" 
                subtitle="Latitude - Longitude - Altura"
                stationType="Estação Privada"
                titleButton="Acessar Estação"
                sensors={sensores}
                // showFavorite
                // isFavorite={favorite}
                onPressButton={teste}
                // onPressFavorite={pressFavorite}
                onPressImage={() => setOpenPicture(true)}
                onPressInfo={pressInfo}
            /> */}
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