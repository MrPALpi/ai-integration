import { axiosInstance } from "@/shared/api";
import { shallowRef, ref, computed } from 'vue';
import { useUserStore } from '@/entities/user';

const useStories = () => {
  const dates = ref([]);
  const limit = shallowRef(100);
  const offset = shallowRef(0);
  const loading = shallowRef(false);
  const stories = shallowRef([]);
  const userStore = useUserStore();

  const getStories = computed(async () => {
    await fetchStories({
      offset: offset.value,
      limit: limit.value,
      ...(dates.value[0] && { startDate: dates.value[0] }),
      ...(dates.value[1] && { endDate: dates.value[1] })
    });
    return stories;
  })

  const fetchStories = async ({
    limit = 100,
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
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate })
        },
        headers: {
          Authorization: userStore.token
        }
      });

      if (res.status === 200) {
        stories.value = res.data;
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

  return {
    stories: getStories,
    dates,
    limit,
    offset,
    loading,
    fetchStories,
    deleteStory
  };
}

export { useStories }