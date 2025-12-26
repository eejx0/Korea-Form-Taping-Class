import { instance } from "../axios";
import { GetEducationFeeRequest, GetScheduleListResponse, GetScheduleResponse, RegisterRequest } from "./type";

// 교육 일정 리스트 조회
export const getScheduleList = async (pageNumber: number) => {
    return await instance.get<GetScheduleListResponse>(`/schedule-list.php?page=${pageNumber}`);
}

// 교육 일정 상세보기
export const getScheduleDetail = async (id: string) => {
    return await instance.get<GetScheduleResponse>(`/schedule.php?id=${id}`);
}

// 교육 일정 수정
export const putSchedule = async (id: string, isActive: boolean) => {
    return await instance.put<{ result: string }>(`/schedule.php`, {id, isActive});
}

// 교육 일정 글쓰기
export const postSchedule = async (formData: FormData) => {
    return await instance.post<{ result: string }>('/schedule.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
};

// 신청 가능한 교육 항목 조회
export const getActiveScheduleList = async () => {
    return await instance.get('/active-schedule-list.php')
}

// 교육 결제 방법
export const getEducationFee = async (data: GetEducationFeeRequest) => {
    return await instance.get<{ cost: string }>(`/check-fee.php`, { params: data });
}

// 교육 등록
export const postRegister = async (data: RegisterRequest) => {
    return await instance.post<{ result: string }>('/register.php', data);
}