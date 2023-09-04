import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Home } from '../screens/Home';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faStar,
  faLock,
  faUser,
  faFileCirclePlus,
  faBookmark,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { Test } from '../screens/Test';

const CustomDrawerContent = (props : any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/aty.png')}
          style={styles.drawerImage}
        />
        <Text style={styles.drawerTitle}>ATY</Text>
        <Text style={styles.drawerSubtitle}>Plataforma de Gerenciamento de Estações Meteorológicas</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
  },
  drawerImage: {
    width: 80,
    height: 80,
  },
  drawerTitle: {
    marginTop: 20,
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
    color: '#FFFFFF',
    fontFamily: "Roboto-Bold",
    marginBottom: 5
  },
  drawerSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    textAlign: "center"
  },
});

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#323238',
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#FFFFFF',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          drawerLabel: 'Página Inicial',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faHome} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='RegisterStation'
        component={Home}
        options={{
          drawerLabel: 'Cadastrar Estação',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faFileCirclePlus} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='MantainerStations'
        component={Home}
        options={{
          drawerLabel: 'Minhas Estações',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faBookmark} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='FavoriteStations'
        component={Home}
        options={{
          drawerLabel: 'Estações Favoritas',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faStar} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='AcessStations'
        component={Home}
        options={{
          drawerLabel: 'Estações com Acesso',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faLock} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={Home}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faUser} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='Exit'
        component={Home}
        options={{
          drawerLabel: 'Sair',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faRightFromBracket} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
      <Drawer.Screen
        name='Test'
        component={Test}
        options={{
          drawerLabel: 'Teste',
          drawerIcon: ({ focused, size }) => (
            <FontAwesomeIcon icon={faRightFromBracket} size={35} color={focused ? '#1B81F5' : '#FFFFFF'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
