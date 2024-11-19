import { axiosInstance } from "@/shared/api";
import { shallowRef, ref, watch } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter, useRoute } from 'vue-router'
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
  const rowsPerPage = shallowRef([10, 20, 50, 100]);
  const userStore = useUserStore();
  const isUserChange = shallowRef(false);
  const route = useRoute();

  const paramStartDate = (callback) => dates.value[0] && { 'startDate': callback(dates.value[0]) };
  const paramEndDate = (callback) => dates.value[1] && { 'endDate': callback(dates.value[1]) };

  const fetchStories = async ({
    limit = DEFAULT_PAGE_SIZE,
    offset = 0,
    startDate = null,
    endDate = null
  } = {}) => {
    loading.value = true;

    try {
      const res = await axiosInstance.get('/api/stories/', {
        params: {
          limit: Math.min(limit, 100),
          offset: Math.max(offset, 0),
          ...(paramStartDate(toDateTime)),
          ...(paramEndDate(toDateTime))
        },
        headers: {
          Authorization: userStore.token
        }
      });

      if (res.status === 200) {
        stories.value = res.data;
        // total.value = res.data.total;
        total.value = stories.value && stories.value[0] && stories.value[0].total;
      }
    } catch (err) {
      console.error(err);
      stories.value = [];
    } finally {
      loading.value = false;
    }
  }

  watch([dates, limit, offset], async () => {
    isUserChange.value = true;
    const page = offset.value / limit.value + 1;

    router.push({ query: { page, rows: limit.value, ...(paramStartDate(getParamDate)), ...(paramEndDate(getParamDate)) } });
    fetchStories({
      offset: offset.value,
      limit: limit.value,
      startDate: dates.value[0],
      endDate: dates.value[1]
    }).then(() => {
      isUserChange.value = false
    });
  });

  watch(
    () => route.query,
    async () => {
      if (isUserChange.value) return
      init(route.query);
    }
  );

  const init = ({ page, rows, startDate, endDate }) => {
    let breakInitFetch = false;

    if (rows) {
      const limitVal = Number(rows);
      breakInitFetch = limit.value !== limitVal;
      limit.value = limitVal;
    }

    if (page) {
      const offsetVal = (Number(page) - 1) * limit.value;
      breakInitFetch = breakInitFetch || offset.value !== offsetVal;
      offset.value = offsetVal;

    }

    if (rows && !rowsPerPage.value.includes(limit.value)) {
      rowsPerPage.value = [limit.value, ...rowsPerPage.value].sort(
        (a, b) => a - b
      );
    }


    if (startDate) {
      const startDateVal = new Date(startDate);
      breakInitFetch = breakInitFetch || dates.value[0] !== startDateVal;
      dates.value = [new Date(startDateVal)];
    }
    else {
      dates.value = [];
    }

    if (endDate) {
      const endDateVal = new Date(startDate);
      breakInitFetch = breakInitFetch || dates.value[1] !== endDateVal;
      dates.value = [dates.value[0], new Date(endDate)]
    } else {
      dates.value = dates.value[0] ? [dates.value[0]] : [];
    }

    if (!breakInitFetch) {
      fetchStories({
        offset: offset.value, limit: limit.value, startDate: dates.value[0], endDate: dates.value[1]
      });
    }
  };

  init(route.query);

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



  return {
    stories,
    total,
    dates,
    limit,
    offset,
    loading,
    rowsPerPage,
    fetchStories,
    deleteStory
  };
}

export { useStories }