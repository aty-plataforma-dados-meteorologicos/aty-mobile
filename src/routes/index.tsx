import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import React from "react";
import StackRoutes from "./stack.routes";

export function Routes(){

    const { COLORS } = useTheme();

    return(
        <View style={{ flex: 1, backgroundColor: COLORS.SHAPE_SECUNDARIA }}>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </View>
    )
}