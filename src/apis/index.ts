import { instance } from './axios';

// 비밀번호 확인
export const checkPassword = async (pass: string) => {
  return await instance.get(`/check-passwd.php?pass=${pass}`);
};

// 파일 다운로드
export const downloadFile = async (fileName: string) => {
  const encodedFileName = encodeURIComponent(fileName);
  return await instance.get(`/reference-download.php?filename=${encodedFileName}`, {
    responseType: 'blob',
  });
};

// 방문자 수 조회
export const getUserCount = async () => {
  return await instance.get<{ today_visit_count: number }>(`/user-count.php`);
};
