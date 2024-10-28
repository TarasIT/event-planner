import axios from 'axios';
import { cookies } from 'next/headers';

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 20000,
});

axiosServer.interceptors.request.use(
  (config) => {
      const token = cookies().get('token')?.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

export default axiosServer;
