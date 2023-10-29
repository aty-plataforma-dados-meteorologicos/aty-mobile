import SensorData from "../sensor/SensorData";

export default interface WeatherStationSensorData{
    weatherStationId: number;
    sensorId: number;
    typeTag: string;
    start: Date;
    stop: Date;
    sensor: SensorData
    measurements:[];
}