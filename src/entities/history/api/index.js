import { axiosInstance } from "@/shared/api";

const fetchStories = async (params = { limit: 10, offset: 0, start_date: null, end_date: null }) => {

  try {
    const res = await axiosInstance.get('/api/stories/', {
      params,
    });

    if (res.status === 200) {
      return res?.data || {};
    }

    return {};

  } catch (err) {
    console.error(err);
  }
}

const deleteStory = async (id) => {
  try {
    const res = await axiosInstance.delete('/api/stories/', {
      data: {
        id
      }
    });

    if (res.status === 200) {
      return res?.data || {};
    }

    return {}

  } catch (err) {
    console.error(err);
  }
}

export const historyAPI = {
  fetchStories,
  deleteStory
}
