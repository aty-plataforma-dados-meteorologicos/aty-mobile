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
    flex: 2;
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
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    text-align: center;
`
export const ContainerInput = styled.View`
    flex: 1;
    align-items: center;
    justify-items: center;
    gap: 5px;
`

export const ContainerButton = styled.View`
    flex: 1;
    align-items: center;
    justify-items: center;
    gap: 20px;
`

export const TitlePassword = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`