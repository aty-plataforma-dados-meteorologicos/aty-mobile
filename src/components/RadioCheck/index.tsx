import React, { useState } from "react";
import { Container, Icon, RadioContainer, RadioLine, RadioTitle, Title } from "./styles";
import { KeyboardTypeOptions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle  } from "@fortawesome/free-solid-svg-icons";
import { faCircle as regularCircle } from "@fortawesome/free-regular-svg-icons";

type ArrayTextItem = {
    name: string;
    value: number;
  };

type Props = {
    titleInput?: string,
    arrayText?: ArrayTextItem[],
    onClick?: (value: number) => void,
    isCheck?: number
}

// Componente de input da aplicação. Pode ser utilizado em todos os input na aplicação mudando apenas o keyboard type. Por padrão o keyboard
// como default será o de texto. Phone-pad e cpf-cnpj mudam o estilo do teclado para numérico e aplica uma mascara. URL somente muda o estilo
// do teclado com atalhos para url.

export function RadioCheck({  titleInput, arrayText, isCheck, onClick } : Props){
    const handleIconClick = (value: number) => {
        if (onClick) {
          onClick(value);
        }
      };

    return(
        <Container>
            {titleInput && <Title>{titleInput}</Title>}
            <RadioContainer>
                {arrayText?.map((item, index) => (
                    <RadioLine onPress={() => handleIconClick(item.value)} key={index}>
                        <Icon>
                            {isCheck === item.value ? (
                                <FontAwesomeIcon icon={faCircle} size={15} color="#FFFFFF" />
                            ) : (
                                <FontAwesomeIcon icon={regularCircle} size={15} color="#FFFFFF" />
                            )}
                        </Icon>
                        <RadioTitle>{item.name}</RadioTitle>
                    </RadioLine>
                    ))}
            </RadioContainer>
        </Container>
    )
}