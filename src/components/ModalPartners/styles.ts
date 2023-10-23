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
    margin-top: 30px;
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

export const BodyModalScroll = styled.ScrollView`
    margin-top: 30px;
`

export const BodyModalContent = styled.View`
    gap: 20px;
    align-items: center;
`