import { axiosInstance } from "@/shared/api";

const getStories = async () => {
  const res = await axiosInstance.post('/api/stories/', { email, password });
  return res?.data;
}

export { getStories }