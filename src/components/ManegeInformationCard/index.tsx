import React from "react";
import { Container, Email, Icon, IconWrapper, Title, TitleContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faCircleInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Esse componente possui todas as funções necessarias nos cards de parceiros, sensores, mantenedores, acesso e etc.
// Utilile as props para ir adequando o componente da forma que quiser. A principio apenas o Title é necessario para usar o componente.
// Ao habilitar um dos icones, não esquecer de habilitar e implementar a ação de pressionar dele.

type Props = {
    title: string,
    email?: string,
    showEdit?: boolean,
    showConfirm?: boolean,
    showInfo?: boolean,
    showDelete?: boolean
    onPressConfirm?: () => void,
    onPressEdit?: () => void,
    onPressDelete?: () => void,
    onPressInfo?: () => void
}

export function ManegePeopleCard({ title, email, showConfirm, showEdit, showInfo, showDelete, onPressEdit, onPressConfirm, onPressDelete, onPressInfo } : Props){
    return(
        <Container>
            <TitleContainer>
                <Title numberOfLines={1} ellipsizeMode="tail">{title}</Title>
                <Email numberOfLines={1} ellipsizeMode="tail">{email}</Email>
            </TitleContainer>
            <Icon>
                {showConfirm &&
                    <IconWrapper onPress={onPressConfirm}>
                        <FontAwesomeIcon icon={faCheck} size={25} color="#FFFFFF" />
                    </IconWrapper>
                }
                {showEdit &&
                    <IconWrapper onPress={onPressEdit}>
                        <FontAwesomeIcon icon={faEdit} size={25} color="#FFFFFF" />
                    </IconWrapper> 
                }
                {showInfo &&
                    <IconWrapper onPress={onPressInfo}>
                        <FontAwesomeIcon icon={faCircleInfo} size={25} color="#FFFFFF"/>
                    </IconWrapper>
                }
                {showDelete &&
                    <IconWrapper onPress={onPressDelete}>
                        <FontAwesomeIcon icon={faTrash} size={25} color="#FFFFFF" />
                    </IconWrapper>
                }
            </Icon>
        </Container>
    )
}