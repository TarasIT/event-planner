import axios from 'axios';
import Cookies from "js-cookie";
import authStore from './app/mobX/stores/authStore';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token') || authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
