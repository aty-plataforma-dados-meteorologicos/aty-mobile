import MantainerData from "./MantainerData";

export default interface WeatherStationMaintainerResponse {
    data: MantainerData[];
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string;
    previousPageUrl: string;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}