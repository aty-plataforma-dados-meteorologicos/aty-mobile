import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Test } from "../screens/Test";


const Tab = createBottomTabNavigator()

export default function TabRoutes(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
            <Tab.Screen
                name="Dashboard"
                component={Test}
            />
            <Tab.Screen
                name="Info"
                component={Test}
            />
            <Tab.Screen
                name="Edit"
                component={Test}
            />
            <Tab.Screen
                name="Acess"
                component={Test}
            />
        </Tab.Navigator>
    )
}
