import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // JWT 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API 요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버 응답이 있는 경우
      switch (error.response.status) {
        case 401:
          toast.error('로그인이 필요합니다.');
          // 로그인 페이지로 리다이렉트
          window.location.href = '/auth/login';
          break;
        case 403:
          toast.error('접근 권한이 없습니다.');
          break;
        case 404:
          toast.error('요청하신 정보를 찾을 수 없습니다.');
          break;
        case 429:
          toast.error('너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.');
          break;
        case 500:
          toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;
        default:
          toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      toast.error('서버와 통신할 수 없습니다. 인터넷 연결을 확인해주세요.');
    } else {
      // 요청 자체가 실패한 경우
      toast.error('요청을 보내는 중 오류가 발생했습니다.');
    }
    return Promise.reject(error);
  }
);

export default api;
