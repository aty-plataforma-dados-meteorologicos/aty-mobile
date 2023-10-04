import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
`

export const ListContainer = styled.View`
    margin-top: 40px;
    flex: 1;
    padding: 5px;
`

export const List = styled.FlatList`
`