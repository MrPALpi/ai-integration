import { ref, shallowRef } from 'vue';
import { useDates } from '@/shared/lib/useDates';
import { toDateTime } from '@/shared/lib/toDateTime';
import { chatAPI } from '../api';


const useChat = () => {
  const messages = ref([
    { type: 'question', text: 'Hello', loading: false },
    { type: 'answer', text: 'Hi', loading: false },
  ]);
  
  const question = shallowRef(null);
  const { dates, paramStartDate, paramEndDate } = useDates();
  const loading = shallowRef(false);
  
  
  
  
  const invokeAssistant = async () => {
    
    loading.value = true;
    const questionValue = question.value;
    question.value = '';
    const answer = ref({type: 'answer', text: '', loading: loading.value});
    
    messages.value.push({ type: 'question', text: questionValue, loading: false });
    messages.value.push(answer.value);

    try {

      const res = await chatAPI.invokeAssistant({
        question: questionValue,
        ...paramStartDate(toDateTime),
        ...paramEndDate(toDateTime)
      });
      
        answer.value.text = res.answer;
        answer.value.loading = false;
      
    } finally {
      loading.value = false;
    }
  }

  return {
    messages,
    question,
    dates,
    loading,
    invokeAssistant
  }
}

export { useChat }