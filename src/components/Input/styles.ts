import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`

export const InputText = styled(TextInput).attrs(({ theme }) => ({
    placeholderTextColor: theme.COLORS.PLACEHOLDER,
  }))`
    margin-top: 10px;
    margin-left: 5px;
    width: 350px;
    height: 50px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: 10px;
    padding: 16px;
`;