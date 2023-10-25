import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Test } from "../screens/Test";
import { PanoramStation } from "../screens/PanoramStation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartPie, faCircleInfo, faPen, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigation, StackType } from "../interfaces/routes/routs";
import { WeatherStationsService } from "../services/WeatherStationService";


const Tab = createBottomTabNavigator()

export default function TabRoutes({ route }: { route: RouteProp<StackNavigation> }){

    const stationId  = route.params?.stationId;
    const [isMaintainer, setIsMaintainer] = useState<boolean>(false);
    const service = new WeatherStationsService();

    async function isMaintainerStation() {
        try {
            const response = await service.getAllWeatherStationByMantainer();
            if (!Array.isArray(response.data)) {
                return;
            }
    
            const stationExists = response.data.some(station => station.id && station.id === stationId);
            setIsMaintainer(stationExists);
    
        } catch (error) {
            console.error("Erro ao verificar se é mantenedor:", error);
        }
    }

    async function getStation(){
        try {
            const response = await service.getWeatherStationById(stationId || '');
            console.log(response)
        } catch (error) {
            console.error("Erro ao verificar se é mantenedor:", error);
        }
    }
    

    useEffect(() => {
        isMaintainerStation()
    }
    , [])

    return(
        <Tab.Navigator screenOptions={{ 
            headerShown: false,  
            tabBarActiveTintColor: 'white', 
            tabBarInactiveTintColor: 'gray',  
            tabBarStyle: { backgroundColor: "#29292E", borderTopWidth: 0, elevation: 0},
            tabBarLabelStyle: {
                fontSize: 11,
              } }}

            initialRouteName="Dashboard">
            <Tab.Screen
                name="Dashboard"
                component={() => <PanoramStation stationId={stationId} />}
                options={{
                    title: "Sensores",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon icon={faChartPie} size={30} color={focused ? '#1B81F5' : 'white'} />
                    )
                }}
            />
            <Tab.Screen
                name="Info"
                component={Test}
                options={{
                    title: "Informações",
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon icon={faCircleInfo} size={30} color={focused ? '#1B81F5' : 'white'} />
                    )
                }}
            />
            {isMaintainer && (
                <>
                    <Tab.Screen
                        name="Edit"
                        component={Test}
                        options={{
                            title: "Editar",
                            tabBarIcon: ({ focused }) => (
                                <FontAwesomeIcon icon={faPen} size={30} color={focused ? '#1B81F5' : 'white'} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Acess"
                        component={Test}
                        options={{
                            title: "Acessos",
                            tabBarIcon: ({ focused }) => (
                                <FontAwesomeIcon icon={faUserLock} size={30} color={focused ? '#1B81F5' : 'white'} />
                            )
                        }}
                    />
                </>
            )}

        </Tab.Navigator>
    )
}
