import styled, { css } from "styled-components/native";

interface ContainerProps {
    hideBackground?: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: auto;
    height: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${({ theme, hideBackground }) => !hideBackground && css`
        background-color: ${theme.COLORS.SHAPE_SECUNDARIA};
    `}
    border-radius: 10px;
    margin-right: 10px;
`

export const TitleContainer = styled.View`
    flex: 1;
    margin-left: 15px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const Email = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const Icon = styled.View`
    flex-direction: row;
`

export const IconWrapper = styled.TouchableOpacity`
    margin-right: 10px;
    margin-left: 5px;
`