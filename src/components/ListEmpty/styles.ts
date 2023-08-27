import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const Message = styled.Text`
    text-align: center;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.WHITE}
`