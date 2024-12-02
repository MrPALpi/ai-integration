import { computed } from "vue";
import { useHistoryStore } from "@/entities/history";

const history = useHistoryStore();

export const deleteStory = async (id) => history.deleteStory(id);

export const selectedStoriesLength = computed(() => history.selectedStories.length);
