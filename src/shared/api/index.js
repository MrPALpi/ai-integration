import axios from "axios";
import { useUserStore } from '@/entities/user';
import * as toast from '../lib/toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json"
  },
  timeout: 10000
});


let userStore = null;
const getUserStore = () => {
  if (!userStore) {
    userStore = useUserStore();
  }
  return userStore;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers?.Authorization) {
      return config;
    }

    // Add auth token
    const store = getUserStore();
    if (store?.token) {
      config.headers.Authorization = store.token;
    }

    return config;
  },
  (error) => {
    toast.error('Request Error', 'Failed to send request');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error?.response;

    if (!response) {
      toast.error('Network Error', 'Failed to connect to server');
      return Promise.reject(error);
    }

    const { status, statusText, data } = response;

    if (data?.detail) {
      const errorDetail = data.detail;
      const errorMessage = Array.isArray(errorDetail)
        ? errorDetail.flatMap(e => e.msg).join(' ')
        : errorDetail;

      toast.error(`${status} ${statusText}`, errorMessage);
    } else {
      toast.error(
        'API Error',
        status ? `${status} ${statusText}` : 'Unknown error occurred'
      );
    }


    if (status === 401) {
      const store = getUserStore();
      store?.logout();
    }

    console.error('[API Error]', {
      status,
      statusText,
      data,
      url: response.config?.url
    });

    return Promise.reject(error);
  }
);

export { axiosInstance };
