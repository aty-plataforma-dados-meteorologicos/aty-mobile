import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ModalContainer, CloseIcon, CloseIconContainer } from "./styles";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";


export function ModalInfoSensor(){
    return(
        <ModalContainer>
            <CloseIconContainer>
                <CloseIcon>
                    <FontAwesomeIcon icon={faTimes} size={25} color="#FFFFFF" />
                </CloseIcon>   
            </CloseIconContainer>
        </ModalContainer>
    )
}