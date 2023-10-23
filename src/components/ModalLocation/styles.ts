import styled from "styled-components/native";

export const Container = styled.Modal`
`

export const ModalView = styled.View`
    flex: 1;
    margin-top: 20px;
    padding: 10px;
    width: auto;
    height: auto;
    background-color: ${({theme}) => theme.COLORS.PLACEHOLDER};
    border-radius: 30px;
    align-items: center;
    justify-items: center;
`

export const Header = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: auto;

`

export const Title = styled.Text`
    flex: 1;
    text-align: center;
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.MEDIUM};
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
`

export const BodyModalContent = styled.View`
    position: absolute;
    bottom: 10px; 
    left: 10px;
    right: 10px;
    gap: 5px;
    margin-bottom: 10px;
    align-items: center;
`