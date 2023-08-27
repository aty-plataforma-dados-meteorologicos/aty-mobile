import styled from "styled-components/native";

export const Container = styled.View`
    width: 350px;
    height: 50px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_SECUNDARIA};
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    margin-left: 15px;
    flex: 1;
`

export const Icon = styled.TouchableOpacity`
    margin-right: 15px;
`