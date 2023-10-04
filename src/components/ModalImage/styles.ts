import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export const ModalContainer = styled.View`
  width: auto;
  height: 95%;
  background-color: ${({theme}) => theme.COLORS.SHAPE_SECUNDARIA};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  margin: 5px;
`;

export const CloseIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseIcon = styled(FontAwesomeIcon)`
`;

export const ImagePlaceholder = styled.View`
    margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
