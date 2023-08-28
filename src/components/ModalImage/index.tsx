import React, { useState } from 'react';
import { TouchableOpacity, Animated, ViewStyle, Image, StyleSheet } from 'react-native';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalContainer, CloseIcon, ImagePlaceholder, CloseIconContainer } from './styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalImage({ isOpen, onClose } : Props) {
  const [fadeAnim] = useState(new Animated.Value(0));  // Inicializa a animação
  
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => onClose());  // Chama onClose após a animação completar
  };

  if (isOpen) {
    fadeIn();
  } else {
    fadeOut();
  }

  return (
    <Animated.View >
      <ModalContainer>
        <CloseIconContainer>
            <TouchableOpacity onPress={fadeOut}>
                <CloseIcon icon={faTimes} size={30} color='#FFFFFF'/>
            </TouchableOpacity>
        </CloseIconContainer>
        <ImagePlaceholder>
          <Image source={require('../../assets/aty.png')} style={{width: 300, height: 300}}/>
        </ImagePlaceholder>
      </ModalContainer>
    </Animated.View>
  );
};
