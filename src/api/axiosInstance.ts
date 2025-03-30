// axiosInstance.ts

import axios from "axios";
import useUserStore from "@/store/useUserStore";

console.log("🔐 BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
console.log("🔐 API_TOKEN:", process.env.NEXT_PUBLIC_API_TOKEN);

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// 👉 Authorization 헤더 자동 설정, 요청 보낼때 마다 localstorage에서 토큰 가져오기
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // localStorage에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 Authorization 추가
  }
  return config;
});

// 👉 요청 보낼 때마다 토큰 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // localStorage에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 Authorization 추가
  }
  return config;
});

// login 토큰 만료 체크 함수
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem("expiresAt");
  if (!expiresAt) return true;

  return new Date().getTime() > parseInt(expiresAt, 10);
};

// 인터셉터로 만료 체크 후 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && !isTokenExpired()) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // 만료되거나 없는 경우
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    useUserStore.getState().clearUser(); // Zustand 상태 초기화
  }
  return config;
});

export default axiosInstance;
