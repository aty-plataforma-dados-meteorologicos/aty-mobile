import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get('window').height;



export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const ImageBackground = styled.Image`
    position: absolute;
`

export const ContainerPhoto = styled.View`
    height: ${screenHeight * 0.6}px;
    align-items: center;
    justify-content: center;
`

export const Logo = styled.Image`
    width: 150px;
    height: 150px;
`

export const ContainerTitle = styled.View`
    flex: 1;
    align-items: center;
    justify-items: center;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    margin-bottom: 20px;
`

export const Subtitle = styled.Text`
    width: 300px;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    text-align: center;
`

export const ContainerButton = styled.View`
    flex: 1;
    align-items: center;
    justify-items: center;
    gap: 10px;
`