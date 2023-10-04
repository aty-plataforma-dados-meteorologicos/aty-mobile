import styled from "styled-components/native";

export const ModalContainer = styled.View`
  width: 300px;
  height: 300px;
  background-color: ${({theme}) => theme.COLORS.SHAPE_SECUNDARIA};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;

export const CloseIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseIcon = styled.TouchableOpacity`
`

export const InfoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const NameContainer = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  padding: 20px;
`

export const InfosSensor = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  padding: 5px;  
`