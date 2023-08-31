import styled from "styled-components/native";


export const Container = styled.View`
    width: 360px;
    height: 350px;
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
export const ContainerPhoto = styled.TouchableOpacity`
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
    margin-right: 10px;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const VerticalScrollView = styled.ScrollView`
  flex-direction: column;
  height: 180px;
  width: 100%;
`;

export const ContainerSensor = styled.View`
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-items: center;  
`

export const TitleSensor = styled.Text`
    flex: 1;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const ContainerThree = styled.View`
    width: 100%;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const Button = styled.TouchableOpacity`
    width: 300px;
    height: 40px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.BLUE};
    align-items: center;
    justify-content: center;
`

export const ButtonTitle = styled.Text`

`



