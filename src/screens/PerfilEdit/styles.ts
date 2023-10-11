import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
`

export const FormContainer = styled.View`
    margin-top: 40px;
    gap: 20px;
    flex: 1;
    padding: 15px;
`

export const ContainerButton = styled.View`
    flex: 1;
    align-items: center;
    justify-items: center;
    justify-content: flex-end;
    margin-bottom: 40px;
`