import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/13-4/",
});

export default axiosInstance;
