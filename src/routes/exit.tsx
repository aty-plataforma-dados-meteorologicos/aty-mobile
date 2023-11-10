import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { StackType } from "../interfaces/routes/routs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Exit(){
    const navigation = useNavigation<StackType>();

    async function RemoveUser(){
      await AsyncStorage.removeItem('userToken');
    }

    useEffect(() => {
        RemoveUser();
        navigation.reset({
          index: 0,
          routes: [{name: 'EntryScreen'}]
      })
      }, []);

      return(
        <>
        </>
      )
}