
export default interface SensorData{
    measurementType: number;
    id: number;
    name: string;
    measurementUnit: string;
    minimum: number;
    maximum: number;
    accuracy: number;
    isEnabled: boolean;
}