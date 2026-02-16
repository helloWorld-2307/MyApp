import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { showError } from "../utils/toast";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://node-js-wse4.onrender.com',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("LoginToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Something went wrong";

    if (status === 401) {
      showError("Session expired. Please login again");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      showError(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
