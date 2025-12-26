import { instance } from "../axios";
import { GetCertListResponse, GetCertResponse } from "./type";

// 한국전문테이핑관리사 리스트 조회
export const getCertList = async (page: number) => {
    return await instance.get<GetCertListResponse>(`/cert-list.php?page=${page}`);
};

// 한국전문테이핑관리사 상세 조회
export const getCertDetail = async (id: string) => {
    return await instance.get<GetCertResponse>(`/cert.php?id=${id}`);
};

// 한국전문테이핑관리사 글쓰기
export const postCert = async (formData: FormData) => {
    return await instance.post<{ result: string }>('/cert.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
