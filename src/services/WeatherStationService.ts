

import WeatherStationMaintainerResponse from "../interfaces/weatherStation/WeatherStationMatainerRespnse";
import api from "./Api";
import WeatherStationSensorData from "../interfaces/weatherStation/WeatherStationSensorData";
import WeatherStationData from "src/interfaces/WeatherStation/WeatherStationData";
import WeatherStationResponse from "src/interfaces/WeatherStation/WeatherStationResponse";
import { err } from "react-native-svg/lib/typescript/xml";
import * as Notification from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage";

export class WeatherStationsService {
    public async getAllWeatherStations() : Promise<WeatherStationResponse> {
        try {
            const response = await api.get('WeatherStations?pageSize=500');
            return response.data;
        } catch (error : any) {
            throw new Error(error);
        }
    }

    public async getAllWeatherStationsMap() : Promise<WeatherStationData> {
        try {
            const response = await api.get('WeatherStations?pageSize=500');
            return response.data.data;
        } catch (error : any) {
            return {} as WeatherStationData;
        }
    }

    // public async getAllWeatherStationByMantainer() : Promise<WeatherStationResponse>{
    //     try {
    //         const response = await api.get('WeatherStations/Maintainers?pageSize=500')
    //         if(response.status === 200)
    //             return response.data;
    //         return {} as WeatherStationResponse;
    //     } catch (error: any) {
    //         if(error.response.status === 403){
    //             const tokenString = await AsyncStorage.getItem('userToken');
    //             const tokenObj = JSON.parse(tokenString || '{}');
    //             const token = tokenObj.token;

    //             // Fazer a requisição usando fetch
    //             const response = await fetch('http://62.72.9.154:5121/api/Maintainers?pageSize=500', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });

    //             console.log(response)
    //         }
    //     }
    // }

    public async getAllWeatherStationByMantainer() : Promise<WeatherStationResponse>{
        try {
            const response = await api.get('WeatherStations/Maintainers?pageSize=500')
            if(response.status === 200)
                return response.data;
            return {} as WeatherStationResponse;
        } catch (error: any) {
            return {} as WeatherStationResponse;
                console.log(error)
        }
    }

    // public async getAllWeatherStationByMantainer(){
    //     const tokenString = await AsyncStorage.getItem('userToken');
    //             const tokenObj = JSON.parse(tokenString || '{}');
    //             const token = tokenObj.token;

    //             console.log(token)

    //             // Fazer a requisição usando fetch
    //             const response = await fetch('http://62.72.9.154:5121/api/Maintainers?pageSize=500', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             });

    //             console.log(response)
    // }


    public async getAllWeatherStationsPerPage(text : string) : Promise<WeatherStationResponse> {
        try {
            const response = await api.get(text);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllWeatherStationsPerRows(rowsNumber : number) : Promise<WeatherStationResponse> {
        try {
            const response = await api.get(`WeatherStations?pageSize=${rowsNumber}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getWeatherStationById(id : string) : Promise<WeatherStationData> {
        try {
            const response = await api.get(`WeatherStations/${id}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllFavoritesByWeatherStationId(id : string) : Promise<WeatherStationData> {
        try {
            const response = await api.get(`WeatherStations/${id}/Favorites`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllMaintainersByWeatherStationId(id : string) : Promise<WeatherStationMaintainerResponse> {
        try {
            const response = await api.get(`WeatherStations/${id}/Maintainers`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllAcessStation() : Promise<WeatherStationResponse> {
        try {
            const response = await api.get(`WeatherStations/RetrieveDataAccessRequests?pageSize=500&status=20`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAcessStation(id : any){
        try {
            const response = await api.get(`WeatherStations/${id}/DataAccessRequests`);
            return response
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllStationWithAcessPendent() : Promise<WeatherStationResponse> {
        try {
            const response = await api.get(`WeatherStations/RetrieveDataAccessRequests?pageSize=500&status=10`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getUserAcessByIdStation(id: any, status: any) : Promise<WeatherStationResponse> {
        try {
            const response = await api.get(`WeatherStations/${id}/DataAccessRequests?status=${status}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async getAllStationFavoritesByUser() : Promise<WeatherStationResponse> {
        try {
            const response = await api.get('WeatherStations/Favorites?pageSize=500');
            if(response.status === 200)
                return response.data;

            if(response.status === 404)
                return {} as WeatherStationResponse;
            return {} as WeatherStationResponse;
        } catch (error : any) {
            return {} as WeatherStationResponse;
        }
    }

    public async getWeatherStationPhoto(stationId : any) : Promise<String> {
        try {
            const response = await api.get(`WeatherStations/${stationId}/Photo`);
            if(response.status === 200)
                return response.data;
        } catch (error : any) {
            console.log(error)
        }
    }

    public async getDataBySensor(stationId: string, sensorId: any, start: any, stop: any) : Promise<WeatherStationSensorData> {
        try {
            if(start === null || stop === null){
            const stopDateDateTime = new Date(); // data e hora atual
            const startDateTime = new Date(); 
            startDateTime.setDate(stopDateDateTime.getDate() - 1); // 24 horas antes da hora atual
    
            // formatando para o padrão ISO string
            const stopDateDateTimeString = stopDateDateTime.toISOString();
            const startDateTimeString = startDateTime.toISOString();
    
            const response = await api.get(`WeatherStations/${stationId}/Data?sensor=${sensorId}&start=${startDateTimeString}&stop=${stopDateDateTimeString}`);
            return response.data;
            }else{
                const response = await api.get(`WeatherStations/${stationId}/Data?sensor=${sensorId}&start=${start}&stop=${stop}`);
                return response.data;
            }
        } catch (error : any) {
            return {} as WeatherStationSensorData;
        }
    }

    public async RequestAcessToTheWeatherStation(stationId : any) : Promise<Boolean>{
        try{
            const response = await api.get(`WeatherStations/${stationId}/RequestDataAccess`)
            if(response.status === 200){
                return true
            }
            return false
        } catch (error : any) {
            throw new Error(error)
        }
    }
    
    

    public async createWeatherStation(weatherStation : WeatherStationData) : Promise<WeatherStationData> {
        try {
            const response = await api.post('WeatherStations', weatherStation);
            if(response.status === 201)
                return response.data;
            return {} as WeatherStationData;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async addWeatherStationFavorite(weatherStation : WeatherStationData) : Promise<Boolean> {
        try {
            const response = await api.post(`WeatherStations/${weatherStation.id}/Favorites`, {weatherStationId: weatherStation.id});
            if(response.status === 200)
                return true;
            return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async aceptRejectUserSolicitation(idStation: any, idUser: any, auth: any) : Promise<WeatherStationResponse> {
        try {
            const response = await api.put(`WeatherStations/${idStation}/DataAccessRequests/${idUser}?newAuth=${auth}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async updateWeatherStation(weatherStation : WeatherStationData) : Promise<Boolean> {
        try {
            const response = await api.put(`WeatherStations/${weatherStation.id}`, weatherStation);
            if(response.status === 200)
                return true;
            return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async deleteMantainer(idStation: string, idMantainer: string) : Promise<Boolean>{
        try{
            const response = await api.delete(`WeatherStations/${idStation}/Maintainers/${idMantainer}`);
            if(response.status === 204)
                return true;
            return false;
        } catch(error : any){
            throw new Error(error)
        }
    }

    public async removeWeatherStationFavorite(weatherStation : WeatherStationData) : Promise<Boolean> {
        try {
                const response = await api.delete(`WeatherStations/${weatherStation.id}/Favorites`)
                if(response.status === 204)
                    return true;
                return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async desactivateWeatherStation(weatherStation : WeatherStationData) : Promise<Boolean> {
        try {
            weatherStation.isEnabled = false;
            const response = await api.put(`WeatherStations/${weatherStation.id}`, weatherStation);
            if(response.status === 200)
                return true;
            return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async activateWeatherStation(weatherStation : WeatherStationData) : Promise<Boolean> {
        try {
            weatherStation.isEnabled = true;
            const response = await api.put(`WeatherStations/${weatherStation.id}`, weatherStation);
            if(response.status === 200)
                return true;
            return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }

    public async addWeatherStationMainteiner(weatherStation : WeatherStationData, responsableEmail : string) : Promise<Boolean> {
        try {
            const response = await api.post(`WeatherStations/${weatherStation.id}/Maintainers`, {userEmail: responsableEmail, weatherStationId: weatherStation.id});
            if(response.status === 200)
                return true;
            return false;
        } catch (error : any) {
            throw new Error(error)
        }
    }
}