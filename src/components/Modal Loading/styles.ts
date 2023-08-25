import styled from 'styled-components/native';
import { View, Text, Animated } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

export const ModalBackground = styled(View)`
  background-color: #202024;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

export const Spinner = styled(View)`
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const Ball = styled(Animated.View)`
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
`;

export const LoadingText = styled(Text)`
  color: #ffffff;
  margin-top: 5px;
  font-size: 14px;
`;
