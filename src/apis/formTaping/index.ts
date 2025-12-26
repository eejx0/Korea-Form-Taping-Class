import { instance } from "../axios";
import { GetReferenceListResponse, GetReferenceResponse } from "./type";

// 자료실 리스트 조회
export const getReferenceList = async (page: number) => {
    return await instance.get<GetReferenceListResponse>(`/reference-list.php?page=${page}`);
};

// 자료실 상세 조회
export const getReferenceDetail = async (id: string) => {
    return await instance.get<GetReferenceResponse>(`/reference.php?id=${id}`);
};

// 자료실 글쓰기
export const postReference = async (formData: FormData) => {
    return await instance.post<{ result: string }>('/reference.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
