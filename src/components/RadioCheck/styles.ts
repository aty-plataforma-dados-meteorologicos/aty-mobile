import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const RadioContainer = styled.View`
    flex: 1;
    align-items: flex-start;
    width: 350px;
    height: 50px;
    padding: 10px;
    gap: 2px
`;

export const RadioLine = styled.TouchableOpacity`
    flex-direction: row;
    gap: 20px;
`

export const Icon = styled.View`
`

export const RadioTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`