import PartnerData from "../partner/PartnerData";
import SensorData from "../sensor/SensorData";

export default interface MantainerData{
    weatherStationId: string;
    applicationUserId: string;
    applicationUserName: string;
    applicationUserEmail: string;
    isDataAuthorized: boolean;
    isFavorite: boolean;
    isMaintainer: boolean;
    id: string;
    isEnabled: boolean;
}