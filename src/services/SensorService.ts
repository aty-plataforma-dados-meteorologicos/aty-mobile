import SensorData from "../interfaces/sensor/SensorData";
import SensorResponse from "../interfaces/sensor/SensorResponse";
import api from "./Api";

class SensorService {
    public async getAllSensors() : Promise<SensorResponse> {
        try {
            const response = await api.get('Sensors?pageSize=1000');
            return response.data;
        } catch (error : any) {
            throw new Error(error);
        }
    }

    public async getAllSensorsRegisterWeatherStation() : Promise<SensorData> {
        try {
            const response = await api.get('Sensors');
            return response.data.data;
        } catch (error : any) {
            throw new Error(error);
        }
    }

    public async getSensorById(id : string) : Promise<SensorData> {
        try {
            const response = await api.get(`Sensors/${id}`);
            return response.data;
        } catch (error : any) {
            throw new Error(error)
        }
    }
}

export default SensorService;