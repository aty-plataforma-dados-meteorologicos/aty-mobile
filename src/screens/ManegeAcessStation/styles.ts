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

export const ContainerModalSensor = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center; 
`;

export const PartnerContainer = styled.ScrollView`
    flex: 1;
    height: 250px;
    gap: 10px;
`

export const PartnerHeader = styled.View`
    flex-direction: row;
    gap: 10px;
    margin-bottom: 20px;
`

export const TitlePartnerSensorContainer = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`
