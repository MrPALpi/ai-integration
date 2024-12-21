import { ref, shallowRef, computed } from 'vue';
import { defineStore } from 'pinia'
import { useDates } from '@/shared/lib/useDates';
import { toDateTime } from '@/shared/lib/toDateTime';
import { chatAPI } from '../api';
import { SECONDS_PER_DAY_TIMESPAN } from '@/shared/lib/SecondsPerDayTimespan';


export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);
  const errors = ref(new Set());
  const question = shallowRef(null);
  const endDate = new Date();
  const starDate = new Date(endDate.getTime() - (SECONDS_PER_DAY_TIMESPAN * 6));
  const { dates, paramStartDate, paramEndDate } = useDates(starDate, endDate);
  const loading = shallowRef(false);

  const invokeAssistant = async () => {

    if (question.value.length === 0) {
      errors.value.add('Вопрос не может быть пустым');
    }

    if (dates.value === null || dates.value.length === 0) {
      errors.value.add('Нужно выбрать даты запроса');
    }

    if (errors.value.size) {
      return;
    }

    loading.value = true;
    const questionValue = question.value;
    question.value = '';
    const answer = ref({ type: 'answer', text: '', loading: loading.value });

    messages.value.push({ type: 'question', text: questionValue, loading: false });
    messages.value.push(answer.value);

    try {

      chatAPI.invokeAssistant({
        question: questionValue,
        ...paramStartDate(toDateTime),
        ...paramEndDate(toDateTime)
      }).then(res => {
        answer.value.text = res.answer;
        answer.value.loading = false;
      });


    } finally {
      loading.value = false;
    }
  }

  const removeError = (error) => {
    errors.value.delete(error);
  }

  const errorsList = computed(() => {
    return [...errors.value];
  })

  return {
    messages,
    errors,
    errorsList,
    question,
    dates,
    loading,
    invokeAssistant,
    removeError
  }
})
