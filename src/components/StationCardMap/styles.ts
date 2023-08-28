import styled from "styled-components/native";


export const Container = styled.View`
    width: 360px;
    height: 230px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ContainerOne = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
`

export const Photo = styled.Image`
    width: 70px;
    height: 70px;
`

export const ContainerTitle = styled.View`
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
    margin-left: 10px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const Subtitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const Icon = styled.TouchableOpacity`
    margin-right: 20px;
`

export const ContainerTwo = styled.View`
    width: 100%;
    margin-left: 20px;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ListSensor = styled.FlatList`

`

export const TitleSensor = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`



