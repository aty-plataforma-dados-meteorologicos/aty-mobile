import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.SHAPE_SECUNDARIA};
`

export const HeaderContainer = styled.View`
    align-items: center;
    padding: 20px;
    margin-top: 10px;
`

export const Image = styled.Image`
    width: 80px;
    height: 80px;
`

export const TitleApp = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`

export const SubtitleApp = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    text-align: center;
    margin-top: 5px;
`

export const IconsContainer = styled.ScrollView.attrs({
    contentContainerStyle: {
      alignItems: 'flex-start'
    }
  })`
      margin-bottom: 20px;
  `;
  

export const Icon = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-items: flex-start;
    padding: 10px;
`

export const TitleIcon = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
`