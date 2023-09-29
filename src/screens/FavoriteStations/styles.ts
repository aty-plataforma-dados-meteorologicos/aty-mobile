import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
`

export const ListContainer = styled.View`
    flex: 1;
    margin-top: 40px;
    padding: 5px;
`

export const List = styled.FlatList`
`
