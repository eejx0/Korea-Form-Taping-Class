import { instance } from "../axios";
import { GetAlbumListResponse, GetAlbumDetailResponse } from "./type";

const BASE_URL = "http://k-formtaping.co.kr";

// 앨범 리스트 조회
export const getAlbumList = async (page: number) => {
    return await instance.get<GetAlbumListResponse>(`/album-list.php?page=${page}`);
};

// 앨범 상세 조회 (이미지 목록)
export const getAlbumDetail = async (count: string) => {
    return await instance.get<GetAlbumDetailResponse>(`/album.php?count=${count}`);
};

// 앨범 글쓰기
export const postAlbum = async (formData: FormData) => {
    return await instance.post<{ result: string }>('/album.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// 이미지 URL 생성 헬퍼
export const getImageUrl = (imagePath: string) => {
    return `${BASE_URL}/${imagePath}`;
};
