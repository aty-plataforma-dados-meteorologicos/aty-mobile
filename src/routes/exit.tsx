import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useEffect } from "react";

export async function Exit(){
    const navigation = useNavigation();

    useEffect(() => {
        (navigation.navigate as any)("EntryScreen");
      }, []);

      return(
        <> </>
      )
}