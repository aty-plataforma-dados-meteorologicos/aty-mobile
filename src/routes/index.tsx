import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { DrawerRoutes } from "./app.drawerRoutes";
import { useTheme } from "styled-components/native";
import React from "react";

export function Routes(){

    const { COLORS } = useTheme();

    return(
        <View style={{ flex: 1, backgroundColor: COLORS.SHAPE_SECUNDARIA }}>
            <NavigationContainer>
                <DrawerRoutes />
            </NavigationContainer>
        </View>
    )
}