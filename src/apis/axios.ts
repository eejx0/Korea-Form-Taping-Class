import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (res) => {
    return res;
  },
  (err) => {
    alert('요청 중 오류가 발생했습니다');
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('응답 오류:', err);
    return Promise.reject(err);
  }
);
