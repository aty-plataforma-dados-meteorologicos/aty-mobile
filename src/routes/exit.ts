import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";

type RootStackParamList = {
    Home: undefined;
    EntryScreen: undefined;
    // add other routes here
  };
  
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export async function Exit(){
    const navigation = useNavigation<NavigationProp>();
    navigation.navigate("Home")

    useEffect(() => {
        navigation.navigate("EntryScreen");
      }, []);

      return null
}