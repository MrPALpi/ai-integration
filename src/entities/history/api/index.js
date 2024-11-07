import { axiosInstance } from "@/shared/api";
import * as toast from '@/shared/lib/toast.js';

const getStories = async () => {
  const res = await axiosInstance.post('/api/stories/');
  return res?.data;
}

export { getStories }