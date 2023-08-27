import { icon } from '@fortawesome/fontawesome-svg-core';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styled } from "styled-components/native";


export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    paddingHorizontal: 20px;
`

export const TitleContainer = styled.View`
    width: 220px;
    height: 40px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const MenuContainer = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`

export const LocationContainer = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`
