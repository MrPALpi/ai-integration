import { axiosInstance } from "@/shared/api";
import { shallowRef, ref, computed, watch, onUnmounted } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getParamDate } from "@/shared/lib/getParamDate";
import { toDateTime } from "@/shared/lib/toDateTime";

const useStories = () => {
  const DEFAULT_PAGE_SIZE = 10;

  const router = useRouter();
  const dates = ref([]);
  const limit = shallowRef(DEFAULT_PAGE_SIZE);
  const offset = shallowRef(0);
  const total = shallowRef(0);
  const loading = shallowRef(false);
  const stories = shallowRef([]);
  const selectedStories = ref([]);
  const rowsPerPage = shallowRef([10, 20, 50, 100]);
  const userStore = useUserStore();
  const route = useRoute();

  const paramStartDate = (callback) => dates.value && dates.value[0] && { 'start_date': callback(dates.value[0]) };
  const paramEndDate = (callback) => dates.value && dates.value[1] && { 'end_date': callback(dates.value[1]) };
  const needClearFilters = computed(() => (dates?.value?.length > 0 || offset.value > 0) && !stories.value.length);

  const fetchStories = async () => {
    loading.value = true;

    try {
      const res = await axiosInstance.get('/api/stories/', {
        params: {
          limit: Math.min(limit.value, 100),
          offset: Math.max(offset.value, 0),
          ...(paramStartDate(toDateTime)),
          ...(paramEndDate(toDateTime))
        },
        headers: {
          Authorization: userStore.token
        }
      });

      if (res.status === 200) {
        stories.value = res.data.stories;
        total.value = res.data.total;
      }
    } catch (err) {
      console.error(err);
      stories.value = [];
    } finally {
      loading.value = false;
    }
  }

  const deleteStory = async (id) => {
    try {
      const res = await axiosInstance.delete('/api/stories/', {
        data: {
          id: id
        }
      });

      if (res.status === 200) {
        stories.value = stories.value.filter(story => story.id !== id);
      }
      return res?.data;
    } catch (err) {
      console.error(err);
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

  init(route.query);

  watch([dates, limit, offset], async () => {
    const page = offset.value / limit.value + 1;

    router.push({ query: { page, rows: limit.value, ...(paramStartDate(getParamDate)), ...(paramEndDate(getParamDate)) } });
    await fetchStories()
  });


  window.addEventListener('popstate', () => {
    setVarsFromQuery(route.query);
  });

  onUnmounted(() => {
    window.removeEventListener('popstate', () => {
      setVarsFromQuery(route.query);
    });
  });


  return {
    stories,
    selectedStories,
    total,
    dates,
    limit,
    offset,
    loading,
    rowsPerPage,
    fetchStories,
    deleteStory,
    selectStory,
    deselectStory,
    needClearFilters
  };
}

export { useStories }