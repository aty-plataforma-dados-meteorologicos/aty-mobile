import { AxiosResponse } from "axios";
import api from "./Api";
import { UserResponse } from "../interfaces/user/UserResponse";
import { UserData } from "../interfaces/user/UserData";
import WeatherStationResponse from "../interfaces/weatherStation/WeatherStationResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UserService {
    public async getAllUsers() : Promise<UserResponse> {
        try {
            const response = await api.get('Users');
            return response.data;
        } catch (error : any) {
            throw new Error(error);
        }
    }

    public async getAllUsersPerPage(text : string) : Promise<UserResponse> {
        try {
            const response = await api.get(text);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllUsersPerRows(rowsNumber : number) : Promise<UserResponse> {
        try {
            const response = await api.get(`Users?pageSize=${rowsNumber}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getUserById(id : string) : Promise<UserResponse> {
        try {
            const response = await api.get(`Users/${id}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async createUser(user : any) : Promise<boolean> {
        try {
            const response = await api.post('Users', user);
            if(response.status === 201)
                return true;
            return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async updateUser(user : any) : Promise<UserData> {
        try {
            const response = await api.put(`Users/${user.id}`, user);
            if(response.status === 200)
                return response.data;
            return {} as UserData;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async deleteUser(id : string) : Promise<Boolean> {
        try {
            const response = await api.delete(`Users/${id}`);
            if(response.status === 204)
                return true;
            else 
                return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async login(user : any) {
        try {
            const response = await api.post('Authentication', user, { skipInterceptor: true } as any);
            if( response && response.status === 200){
                await AsyncStorage.setItem("userToken", JSON.stringify(response.data));
                return true;
            }
            else
                return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async refreshToken(){
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            const { refreshToken, token } = JSON.parse(storedToken);

            // Tentativa de atualizar o token
            try {
            const res = await api.post('Authentication/TokenRefresh', {
                accessToken: token,
                refreshToken: refreshToken,
            });

            if (res.status === 200) {
                await AsyncStorage.setItem('userToken', JSON.stringify(res.data));
                return true
            }
            return false
            } catch (ex) {
                return Promise.reject(ex);
            }
        }
    }
    

    public async getStationMaintainer() : Promise<WeatherStationResponse> {
        try {
            const response = await api.get('WeatherStations/Maintainers');
            if(response.status == 200)
                return response.data;
            return {} as WeatherStationResponse;
        } catch (error : any) {
            return {} as WeatherStationResponse;
        }
    }

}

export default UserService;
