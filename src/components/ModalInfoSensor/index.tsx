import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ModalContainer, CloseIcon, CloseIconContainer, InfoContainer, NameContainer, InfosSensor } from "./styles";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SensorData from "../../interfaces/sensor/SensorData";

type Props = {
    onClose: (event : any) => void
    sensorInfo: SensorData
}


export function ModalInfoSensor({ onClose, sensorInfo } : Props){
    
    const measurementTypeMapping : any = {
        0: "Outros",
        1: "Temperatura do Ar",
        2: "Humidade Relativa",
        3: "Pressão Atmosférica",
        4: "Velocidade do Vento",
        5: "Direção do Vento",
        6: "Precipitação",
        7: "Radiação Solar",
        8: "Radiação Ultravioleta",
        9: "Radiação Infravermelha",
        10: "Ponto de Orvalho",
        11: "Nuvens",
        12: "Qualidade do Ar",
        13: "Evapotranspiração",
        14: "Temperatura do Solo",
        15: "Umidade do Solo",
        16: "Radiação de Onda Longa",
        17: "Temperatura da Superfície do Mar",
        18: "Altura da onda",
        19: "Direção da Onda",
        20: "Visibilidade",
        21: "Índice de calor",
        22: "Cobertura de Nuvens",
        23: "Índice de Precipitabilidade",
        24: "Índice Ultravioleta",
        25: "Índice de Conforto Térmico"
    };
    

    return(
        <ModalContainer>
            <CloseIconContainer>
                <CloseIcon onPress={onClose}>
                    <FontAwesomeIcon icon={faTimes} size={25} color="#FFFFFF" />
                </CloseIcon>   
            </CloseIconContainer>
            <InfoContainer>
                <NameContainer>{sensorInfo.name}</NameContainer>

                <InfosSensor>Medida Máxima: {sensorInfo.maximum}</InfosSensor>
                <InfosSensor>Medida Minima: {sensorInfo.minimum}</InfosSensor>
                <InfosSensor>Acurácia: {sensorInfo.accuracy}</InfosSensor>
                <InfosSensor>Unidade de Medida: {sensorInfo.measurementUnit}</InfosSensor>
                <InfosSensor>Tipo: {measurementTypeMapping[sensorInfo.measurementType]}</InfosSensor>
            </InfoContainer>
        </ModalContainer>
    )
}