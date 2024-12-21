import { ref } from 'vue';

export const useDates = (startDate = null, endDate = null) => {
  let datesValue = null;

  if (!!startDate) {
    datesValue = [startDate];

    if (!!endDate) {
      datesValue.push(endDate);
    }
  }

  const dates = ref(datesValue);
  const paramStartDate = (callback) => dates.value && dates.value[0] && { 'start_date': callback(dates.value[0]) };
  const paramEndDate = (callback) => dates.value && dates.value[1] && { 'end_date': callback(dates.value[1]) };

  return {
    dates,
    paramStartDate,
    paramEndDate
  }
}