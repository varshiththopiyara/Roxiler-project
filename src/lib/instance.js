import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://2swtvzr8-8080.inc1.devtunnels.ms/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

export default axiosInstance;
