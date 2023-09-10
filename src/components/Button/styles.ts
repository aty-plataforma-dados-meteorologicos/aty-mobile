import styled from "styled-components/native";

type Props = {
    color: "PRIMARY" | "SECONDARY"
}

export const ButtonContainer = styled.TouchableOpacity<Props>`
    width: 330px;
    height: 50px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, color }) => color === 'PRIMARY' ? theme.COLORS.BLUE : theme.COLORS.GREEN};
`;

export const ButtonTitle = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;
