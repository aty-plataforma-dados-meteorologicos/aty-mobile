import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    width: 100%;
`

export const MapComp = styled(MapView).attrs(() => ({}))`
`

export const Pin = styled(Marker).attrs(() => ({}))`
    flex: 1;
    width: 100%;
`