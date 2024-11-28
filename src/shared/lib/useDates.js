import { ref } from 'vue';

const useDates = () => {
  const dates = ref(null);
  const paramStartDate = (callback) => dates.value && dates.value[0] && { 'start_date': callback(dates.value[0]) };
  const paramEndDate = (callback) => dates.value && dates.value[1] && { 'end_date': callback(dates.value[1]) };

  return {
    dates,
    paramStartDate,
    paramEndDate
  }
}

export default useDates;
