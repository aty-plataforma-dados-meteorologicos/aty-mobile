import { UserData } from "./UserData";

export interface UserResponse{
    data: UserData[];
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string;
    previousPageUrl: string;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}