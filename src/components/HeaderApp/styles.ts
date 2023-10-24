import { styled } from "styled-components/native";


export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    paddingHorizontal: 20px;
    margin-bottom: 20px;
`

export const TitleContainer = styled.View`
    flex: 10;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const BackContainer = styled.View`
    flex: 1;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`
