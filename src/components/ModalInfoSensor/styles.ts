import styled from "styled-components/native";

export const ModalContainer = styled.View`
  width: 350px;
  height: 650px;
  background-color: ${({theme}) => theme.COLORS.SHAPE_SECUNDARIA};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
`;

export const CloseIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseIcon = styled.TouchableOpacity`
`