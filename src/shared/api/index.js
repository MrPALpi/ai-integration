import axios from "axios";
import { useUserStore } from '@/entities/user'
import * as toast from '../lib/toast'


let userStore = null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json"
  },
});

axiosInstance.interceptors.request.use(
  function (config) {

    if (config.headers.Authorization !== undefined) {
      return config
    }

    if (userStore === null) {
      userStore = useUserStore();
    }

    config.headers.Authorization = userStore.token ?? null;


    return config;
  },

  function (error) {
    toast.error('Error', 'Something went wrong');
    console.error(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    const res = error?.response;

    if (res?.data?.detail) {
      toast.error(`${res.status} ${res.statusText}`, res.data.detail);
    } else {
      toast.error(res.status, res.statusText);
    }

    console.error(error);

    return Promise.reject(error);
  }
);

export { axiosInstance };