import axios from "axios";

// 👉 디버깅용 로그 출력
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
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
