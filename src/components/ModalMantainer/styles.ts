import styled from "styled-components/native";

export const Container = styled.Modal`
    flex: 1;
    align-content: center;
    justify-content: center;
    justify-self: center;
    align-items: center;
`

export const ModalView = styled.View`
    padding: 10px;
    width: 350px;
    height: auto;
    background-color: ${({theme}) => theme.COLORS.SHAPE_SECUNDARIA};
    border-radius: 30px;
    align-self: center;
    margin-top: 200px;
`

export const Header = styled.View`
    margin-top: 10px;
    margin-bottom: 30px;
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
    gap: 10px;
    align-items: center;
`

export const InfosSensor = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  padding: 5px;  
`