<script setup>
	import { ref } from 'vue';
	import { useStories } from '@/entities/history';
	import HistoryList from '@/widgets/HistoryList.vue';
	import DatePicker from 'primevue/datepicker';
	const { stories, dates, limit, offset, loading, fetchStories, deleteStory } =
		useStories();
	fetchStories();
</script>
<template>
	<DatePicker
		v-model="dates"
		selectionMode="range"
		:manualInput="false"
		showIcon
		fluid
	/>
	<history-list
		:stories="stories"
		:loading="loading"
		@delete-story="deleteStory"
	/>
</template>

<style lang="scss" scoped></style>
