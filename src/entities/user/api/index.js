import { axiosInstance } from "@/shared/api";
import * as toast from '@/shared/lib/toast.js';
import { shallowRef } from 'vue';

const loading = shallowRef(false);

const signUp = async (email, password) => {
  loading.value = true;
  try {
    const res = await axiosInstance.post('/api/auth/users', { email, password });

    if (res.status === 201) {
      toast.success(res.statusText, 'Пользователь зарегестрирован')
    }
    return res?.data;
  } finally {
    loading.value = false;
  }
}

const login = async (email, password, device) => {
  loading.value = true;
  try {
    const res = await axiosInstance.post('/api/auth/', { email, password, device });

    if (res.status === 200) {
      toast.success(res.statusText, 'Авторизация успешна')
    }
    return res?.data;
  } finally {
    loading.value = false;
  }
}

export { login, signUp, loading }