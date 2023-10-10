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

export const SensorContainer = styled.ScrollView`
    flex: 1;
    height: 155px;
`

export const TitleSensorContainer = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`


