import PartnerData from "../partner/PartnerData";
import SensorData from "../sensor/SensorData";

export default interface WeatherStationData{
    isFavorite?: boolean;
    id?: string;
    publicId?: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    altitudeMSL?: string;
    partners: PartnerData[];
    isPrivate?: boolean;
    isEnabled?: boolean;
    acessValid?: boolean;
    photoBase64?: string;
    sensors: SensorData[];
}