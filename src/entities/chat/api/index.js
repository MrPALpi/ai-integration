import { axiosInstance } from "@/shared/api";

const invokeAssistant = async (params = { question: '', start_date: null, end_date: null }) => {
  try {
    const res = await axiosInstance.post('/api/assistant/invoke', params);
    let answer = {};

    if (res.status === 200) {
      answer = res?.data || {};
      
    } else if (res.status === 204 || res.status === 500) {
      answer = {
        text: 'Нет ответа'
      }
    }

    return answer;

  } catch (error) {
    console.error(error);
  } 
}

export const chatAPI = {
  invokeAssistant
}
