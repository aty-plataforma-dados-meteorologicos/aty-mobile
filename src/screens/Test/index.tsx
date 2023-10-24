import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "../../components/Input";
import { HeaderApp } from "../../components/HeaderApp";
import { ListEmpty } from "../../components/ListEmpty";
import { ManegeInformationCard } from "../../components/ManegeInformationCard";
import { ModalImage } from "../../components/ModalImage";
import { StationCardMap } from "../../components/StationCardMap";
import { ModalInfoSensor } from "../../components/ModalInfoSensor";
import { Button } from "../../components/Button";
import { EntryScreen } from "../EntryScreen";
import { Login } from "../Login";
import { DrawerMenu } from "../../components/DrawerMenu";
import { ModalPartners } from "../../components/ModalPartners";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ModalLocation } from "../../components/ModalLocation";
import { ModalImagePicker } from "../../components/ModalImagePicker";

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
            {/* <Input titleInput="Testezin" placeholder="Digite sua senha" onChangeText={text => handleInput(text)} keyboardType="default" secureTextEntry/> */}
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
            {/* <ModalInfoSensor /> */}
            {/* <Button title="Cadastre-se" onPress={teste} color="SECONDARY"/> */}
            {/* <Login /> */}
            {/* <DrawerMenu /> */}
            <TouchableOpacity onPress={() => setFavorite(true)}><Text>Abrir modal</Text></TouchableOpacity>
            {/* <ModalPartners onSubmit={(data) => console.log(data)} showModal={favorite} onCloseModal={() => setFavorite(false)} /> */}
            {/* <ModalLocation showModal={favorite} onCloseModal={() => setFavorite(false)} /> */}
            {/* <ModalImagePicker showModal={favorite} onClose={() => setFavorite(false)} /> */}
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
  })