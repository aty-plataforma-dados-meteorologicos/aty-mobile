import WeatherStationData from "./WeatherStationData";

export default interface WeatherStationResponse{
    data: WeatherStationData[];
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string;
    previousPageUrl: string;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}