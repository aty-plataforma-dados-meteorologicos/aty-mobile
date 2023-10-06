import React, { useState } from 'react';
import { TouchableOpacity, Animated, ViewStyle, Image, StyleSheet } from 'react-native';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalContainer, CloseIcon, ImagePlaceholder, CloseIconContainer } from './styles';

type Props = {
  imageUri?: string,
  onClose: (event : any) => void;
};

// Modal de imagem para abrir quando o usuário clicar na foto da estação. Deve ser implementado durante o cadastro da estação, na visualização/edição
// já dentro da estação e na visualização da estação em listas ou pelo pin no mapa. Por padrão a foto será renderizada em 300 x 300 mas pode ser ajustado, 
// só que manualmente aqui dentro do código.

export function ModalImage({ onClose, imageUri } : Props) {
  return (
      <ModalContainer>
        <CloseIconContainer>
            <TouchableOpacity onPress={onClose}>
                <CloseIcon icon={faTimes} size={30} color='#FFFFFF'/>
            </TouchableOpacity>
        </CloseIconContainer>
        <ImagePlaceholder>
          <Image source={require("../../assets/aty.png")} style={{width: 300, height: 300}}/>
        </ImagePlaceholder>
      </ModalContainer>
  );
};
