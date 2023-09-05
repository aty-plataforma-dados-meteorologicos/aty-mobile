import PartnerData from "../partner/PartnerData";
import SensorData from "../sensor/SensorData";

export default interface WeatherStationData{
    isFavorite: boolean;
    id: string;
    publicId: string;
    name: string;
    latitude: string;
    longitude: string;
    altitudeMSL: number;
    partners: PartnerData[];
    isPrivate: boolean;
    isEnabled: boolean;
    sensors: SensorData[];
}