import SensorData from "./SensorData";

export default interface SensorResponse{
    data: SensorData[];
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string;
    previousPageUrl: string;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}