import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
`

export const ListContainer = styled.ScrollView`
    flex: 1;
    padding: 5px;
    gap: 20px;
`

export const Sensor = styled.View`
    margin-top: 10px;
`

export const ContainerList = styled.View`
    margin-top: 10px;
    height: 40px;
`
