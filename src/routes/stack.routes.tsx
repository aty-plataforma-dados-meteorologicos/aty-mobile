import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabRoutes from "./tab.routes";
import DrawerRoutes from "./drawer.routes";
import { EntryScreen } from "../screens/EntryScreen";
import { Login } from "../screens/Login";

const Stack = createStackNavigator()

export default function StackRoutes(){
    return(
        <Stack.Navigator initialRouteName="EntryScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="Station"
                component={TabRoutes}
            />
            <Stack.Screen 
                name="EntryScreen"
                component={EntryScreen}
            />
            <Stack.Screen 
                name="Login"
                component={Login}
            />
            <Stack.Screen 
                name="DrawerRoutes"
                component={DrawerRoutes}
            />
        </Stack.Navigator>
    )
}