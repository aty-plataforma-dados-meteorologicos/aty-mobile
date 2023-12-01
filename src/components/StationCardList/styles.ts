import styled from "styled-components/native";


export const Container = styled.View`
    width: auto;
    height: 100px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_SECUNDARIA};
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 10px;
`

export const PhotoContainer = styled.TouchableHighlight`
    margin-left: 15px;
`

export const Photo = styled.Image`
    width: 70px;
    height: 70px;
`

export const TitleContainer = styled.View`
    margin-left: 20px;
    flex: 1;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    margin-bottom: 2px;
`

export const Subtitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const Icon = styled.TouchableOpacity`
    margin-right: 10px;
`
