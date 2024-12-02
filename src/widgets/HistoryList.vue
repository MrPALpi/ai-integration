<script setup>
	import { computed } from 'vue';
	import { useHistoryStore } from '@/entities/history';
	import { HistoryItem } from '@/entities/history';
	import Button from 'primevue/button';
	import Skeleton from 'primevue/skeleton';
	import DeleteStory from '@/features/deleteStrory/ui/DeleteStory.vue';
	import SelectStory from '@/features/selectStory/ui/SelectStory.vue';

	const history = useHistoryStore();

	const needClearFilters = computed(
		() =>
			(history.dates?.value?.length > 0 || history.offset.value > 0) &&
			!history.stories.value.length
	);
</script>

<template>
	<div v-if="needClearFilters" class="history-list history-list_clear-filters">
		<div>По данным фильтрам нет историй</div>
		<Button
			label="Очистить фильтры"
			@click="clearFilters"
			severity="secondary"
		/>
	</div>

	<template v-else-if="history.loading">
		<Skeleton v-for="i in 4" :key="`skeleton_${i}`" height="164px" />
	</template>

	<div v-else-if="history.stories.length" class="history-list">
		<transition-group name="list">
			<history-item v-for="item in history.stories" :key="item" :story="item">
				<template #header>
					<select-story :id="item.id" />
					<delete-story :id="item.id" />
				</template>
			</history-item>
		</transition-group>
	</div>

	<template v-else> Историй пока нет </template>
</template>

<style lang="scss" scoped>
	.history-list {
		@include flex-list-column(15px);
	}

	.history-list_clear-filters {
		align-items: center;
	}

	.list-move,
	.list-enter-active,
	.list-leave-active {
		transition: all 0.4s;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(20%);
	}

	.list-leave-active {
		max-width: 1430px;
		padding: 0 15px;
		margin: 0 auto;
		width: 100%;
		position: absolute;
	}
</style>
