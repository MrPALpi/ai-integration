import { ref, shallowRef } from 'vue';
import { axiosInstance } from "@/shared/api";
import useDates from '@/shared/lib/useDates';
import { toDateTime } from '@/shared/lib/toDateTime';

const useChat = () => {
  const messages = shallowRef([]);
  const question = shallowRef(null);
  const { dates, paramStartDate, paramEndDate } = useDates();
  const loading = shallowRef(false);

  const invokeAssistant = async () => {
    loading.value = true;

    try {
      const res = await axiosInstance.post('/api/assistant/invoke', {
        ...paramStartDate(toDateTime),
        ...paramEndDate(toDateTime),
        question: question.value
      });
      messages.value.push({ type: 'answer', message: res.data.answer });
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    messages,
    dates,
    question,
    loading,
    invokeAssistant
  }
}

export { useChat };
