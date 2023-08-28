import React from "react";
import { Container, Email, Icon, IconWrapper, Title, TitleContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
    title: string,
    email: string,
    showEdit?: boolean,
    showConfirm?: boolean,
    onPressConfirm?: () => void,
    onPressEdit?: () => void,
    onPressDelete?: () => void,
}

export function ManegePeopleCard({ title, email, showConfirm, showEdit, onPressEdit, onPressConfirm, onPressDelete } : Props){
    return(
        <Container>
            <TitleContainer>
                <Title numberOfLines={1} ellipsizeMode="tail">{title}</Title>
                <Email numberOfLines={1} ellipsizeMode="tail">{email}</Email>
            </TitleContainer>
            <Icon>
                {showConfirm &&
                    <IconWrapper onPress={onPressConfirm}>
                        <FontAwesomeIcon icon={faCheck} size={20} color="#FFFFFF" />
                    </IconWrapper>
                }
                {showEdit &&
                    <IconWrapper onPress={onPressEdit}>
                        <FontAwesomeIcon icon={faEdit} size={20} color="#FFFFFF" />
                    </IconWrapper> 
                }
                <IconWrapper onPress={onPressDelete}>
                    <FontAwesomeIcon icon={faTrash} size={20} color="#FFFFFF" />
                </IconWrapper>
            </Icon>
        </Container>
    )
}