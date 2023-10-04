export default interface WeatherStationSensorData{
    weatherStationId: number;
    sensorId: number;
    typeTag: string;
    start: Date;
    stop: Date;
    measurements:[];
}