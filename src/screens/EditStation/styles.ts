import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
`

export const ListContainer = styled.ScrollView`
    flex: 1;
    padding: 5px;
    gap: 10px;
`

export const List = styled.FlatList`
`

export const ItemContainer = styled.View`
    padding: 5px;
    margin-bottom: 20px;
`

export const TitleItem = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const SensorPartnerContainer = styled.View`
    flex: 1;
`
export const ContainerModalSensor = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center; 
`;


export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    justify-items: center;
`

export const Image = styled.Image`
    width: 350px;
    height: 350px;
    border-radius: 30px;
`

export const PartnerContainer = styled.ScrollView`
    flex: 1;
    height: 155px;
    gap: 10px;
`

export const PartnerHeader = styled.View`
    flex-direction: row;
    gap: 10px;
    margin-bottom: 10px;
`

export const TitlePartnerSensorContainer = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const ContainerButtons = styled.View`
    align-items: center;
    gap: 10px;
`

export const ContainerPublicPrivate = styled.View`
    flex-direction: row;
    gap: 10px;
`

export const ButtonText = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`;

export const ButtonPublicPrivate = styled.TouchableOpacity<{bgColor : string}>`
    flex: 1;
    height: 50px;
    border-radius: 10px;
    background-color: ${({bgColor, theme}) => bgColor === 'GREEN' ? theme.COLORS.GREEN : bgColor === 'BLUE' ? theme.COLORS.BLUE : theme.COLORS.GREEN};
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`
