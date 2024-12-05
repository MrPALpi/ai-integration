import { defineStore } from 'pinia'
import { shallowRef, ref, watch } from 'vue';
import { useDates } from '@/shared/lib/useDates';
import { toDateTime } from '@/shared/lib/toDateTime';
import { historyAPI } from '../api';
import { useRouter } from 'vue-router';
import { getParamDate } from '@/shared/lib/getParamDate';

export const useHistoryStore = defineStore('history', () => {
  const router = useRouter();
  const DEFAULT_PAGE_SIZE = 10;

  const { dates, paramStartDate, paramEndDate } = useDates();
  const limit = shallowRef(DEFAULT_PAGE_SIZE);
  const offset = shallowRef(0);
  const total = shallowRef(0);
  const loading = shallowRef(false);
  const stories = shallowRef([]);
  const selectedStories = ref([]);
  const rowsPerPage = shallowRef([10, 20, 50, 100]);

  const fetchStories = async () => {
    loading.value = true;
    try {
      const res = await historyAPI.fetchStories({
        limit: limit.value,
        offset: offset.value,
        ...paramStartDate(toDateTime),
        ...paramEndDate(toDateTime)
      });

      stories.value = res.stories || [];
      total.value = res.total || 0;
    } finally {
      loading.value = false;
    }
  }

  const deleteStory = async (id) => {
    const res = await historyAPI.deleteStory(id);

    if (res.id !== undefined) {
      stories.value = stories.value.filter((story) => story.id !== id);
    }
  }

  const setVarsFromQuery = ({ page, rows, start_date: startDate, end_date: endDate }) => {
    limit.value = rows ? Number(rows) : limit.value;
    offset.value = page ? (Number(page) - 1) * limit.value : 0;

    if (rows) {
      rowsPerPage.value = [...new Set([...rowsPerPage.value, limit.value])].sort(
        (a, b) => a - b
      );
    }

    if (startDate) {
      dates.value = [new Date(startDate)];
    } else {
      dates.value = [];
    }

    if (endDate) {
      dates.value = [dates.value[0], new Date(endDate)];
    } else {
      dates.value = dates.value[0] ? [dates.value[0]] : [];
    }
  }


  const selectStory = (id) => {
    selectedStories.value.push(id);
  };

  const deselectStory = (id) => {
    selectedStories.value = selectedStories.value.filter(
      (story) => story !== id
    );
  };

  const init = (query) => {
    setVarsFromQuery(query);
    fetchStories();
  };

  const clearFilters = () => {
    offset.value = 0;
    dates.value = [];
  };

  const enableWatch = () => {
    watch(
      () => [dates.value, limit.value, offset.value],
      async (
        [newDates, newLimit, newOffset],
        [oldDates, oldLimit, oldOffset]
      ) => {

        const needRefreshOffset =
          newOffset === oldOffset && newOffset !== 0 && newDates !== oldDates;
        

        if (needRefreshOffset) {
          offset.value = 0;
          return;
        }
  
        const page = newOffset / newLimit + 1;

        router.push({
          query: {
            page,
            rows: limit.value,
            ...paramStartDate(getParamDate),
            ...paramEndDate(getParamDate),
          },
        });

        fetchStories();
      }
    );
  }
    
  return { 
    fetchStories, 
    deleteStory, 
    init, 
    selectStory, 
    deselectStory, 
    clearFilters, 
    enableWatch,
    setVarsFromQuery, 
    limit, 
    offset, 
    total, 
    loading, 
    stories, 
    selectedStories, 
    rowsPerPage, 
    dates 
  }
})