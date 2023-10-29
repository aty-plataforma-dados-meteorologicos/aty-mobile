import styled from "styled-components/native";

export const ModalView = styled.View`
    flex: 1;
    padding: 10px;
    width: auto;
    height: 300px;
`

export const Header = styled.View`
    flex-direction: row;
    width: auto;
    margin-bottom: 5px;
`

export const Title = styled.Text`
    flex: 1;
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    color: ${({theme}) => theme.COLORS.WHITE};
`