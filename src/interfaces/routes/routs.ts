import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackNavigation = {
    Station: {
      stationId: string;
    };
    EntryScreen: undefined;
    Login: undefined;
    RegisterUser: undefined;
    Home: undefined;
    ResetPassword: undefined;
    RegisterStation: undefined;
    MantainerStations: undefined;
    FavoriteStations: undefined;
    AcessStations: undefined;
    Profile: undefined;
    Exit: undefined;
    Test: undefined;
  };

  export type StackType = NativeStackNavigationProp<StackNavigation>;
  