import { axiosInstance } from "@/shared/api";

const invokeAssistant = async (params = { question: '', start_date: null, end_date: null }) => {
  let data = { answer: 'Нет ответа' };
  try {
    const res = await axiosInstance.post('/api/assistant/invoke', params);

    if (res.status.toString().startsWith('2')) {
      data = res?.data || data;
    }

    return data;
  } catch (error) {
    data.answer = 'Произошла ошибка, пожалуйста повторите запрос позже';
    return data;
  }
}

export const chatAPI = {
  invokeAssistant
}
