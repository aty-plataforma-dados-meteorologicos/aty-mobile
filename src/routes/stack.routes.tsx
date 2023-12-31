import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabRoutes from "./tab.routes";
import { EntryScreen } from "../screens/EntryScreen";
import { Login } from "../screens/Login";
import { RegisterUser } from "../screens/RegisterUser";
import { Home } from "../screens/Home";
import { RegisterStation } from "../screens/RegisterStation";
import { MantainerStations } from "../screens/MantainerStations";
import { FavoriteStations } from "../screens/FavoriteStations";
import { AcessStations } from "../screens/AcessStations";
import { Exit } from "./exit";
import { Test } from "../screens/Test";
import { PerfilEdit } from "../screens/PerfilEdit";
import { ResetPassword } from "../screens/ResetPassword";

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
                name="RegisterUser"
                component={RegisterUser}
            />
             <Stack.Screen 
                name="ResetPassword"
                component={ResetPassword}
            />
            <Stack.Screen 
                name="Home"
                component={Home}
            />
            <Stack.Screen 
                name="RegisterStation"
                component={RegisterStation}
            />
            <Stack.Screen 
                name="MantainerStations"
                component={MantainerStations}
            />
            <Stack.Screen 
                name="FavoriteStations"
                component={FavoriteStations}
            />
            <Stack.Screen 
                name="AcessStations"
                component={AcessStations}
            />
            <Stack.Screen 
                name="Profile"
                component={PerfilEdit}
            />
            <Stack.Screen 
                name="Exit"
                component={Exit}
            />
            <Stack.Screen 
                name="Test"
                component={Test}
            />
            {/* <Stack.Screen 
                name="DrawerRoutes"
                component={DrawerRoutes}
            /> */}

        </Stack.Navigator>
    )
}