import { instance } from "../axios";
import { GetScheduleResponse, GetScheduleListResponse } from "./type";

export const getScheduleList = async (pageNumber: number) => {
    return await instance.get<GetScheduleListResponse>('/schedule-list.php');
}

export const getScheduleDetail = async () => {
    return await instance.get<GetScheduleResponse>('/schedule.php');
}