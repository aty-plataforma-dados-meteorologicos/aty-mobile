import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const InputText = styled(TextInput).attrs(({ theme }) => ({
    placeholderTextColor: theme.COLORS.PLACEHOLDER,
  }))`
    width: auto;
    height: 50px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: 10px;
    padding: 5px;
`;

export const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-left: 5px;
    width: auto;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: 10px;
    padding: 16px;
`;