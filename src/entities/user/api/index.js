import { axiosInstance } from "@/shared/api";
import * as toast from '@/shared/lib/toast.js';

const signUp = async (email, password) => {
  const res = await axiosInstance.post('/api/auth/users', { email, password });

  if (res.status === 201) {
    toast.success(res.statusText, 'Пользователь зарегестрирован')
  }

  return res?.data;
}


const login = async (email, password, device) => {
  const res = await axiosInstance.post('/api/auth/', { email, password, device });

  if (res.status === 200) {
    toast.success(res.statusText, 'Авторизация успешна')
  }

  return res?.data;
}

export { login, signUp }