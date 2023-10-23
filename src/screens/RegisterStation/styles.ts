import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
`

export const FormContainer = styled.View`
    margin-top: 40px;
    flex: 1;
    padding: 10px;
    gap: 20px;
`

export const LocationContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`

export const ButtonMap = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    margin-left: 10px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    align-self: flex-end;
    align-items: center;
    justify-content: center;
`

export const SensorPartnerContainer = styled.ScrollView`
    flex: 1;
    height: 155px;
`

export const TitlePartnerSensorContainer = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const PartnerHeader = styled.View`
    flex-direction: row;
    gap: 10px;
`

export const NoPartner = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const ContainerButtons = styled.View`
    align-items: center;
    gap: 20px;
`

export const ContainerModalSensor = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center; 
`;
