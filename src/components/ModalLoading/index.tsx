import React, { useEffect, useRef } from 'react';
import { Modal, Animated, Easing } from 'react-native';
import {  } from 'react-native-fontawesome';
import { Container, ModalBackground, Spinner, LoadingText } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

interface LoadingModalProps {
  isVisible: boolean;
}

export function LoadingModal({ isVisible }: LoadingModalProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : 300,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 50,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -50,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <Modal transparent={true} visible={isVisible}>
      <Container>
        <Animated.View
          style={{
            transform: [{ translateY: translateY }],
          }}>
          <ModalBackground>
            <Spinner>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: translateX,
                    },
                  ],
                }}>
                <FontAwesomeIcon icon={faLocationCrosshairs} size={40} style={{color: '#FFFFFF'}}/>
              </Animated.View>
            </Spinner>
            <LoadingText>Carregando localização...</LoadingText>
          </ModalBackground>
        </Animated.View>
      </Container>
    </Modal>
  );
}
