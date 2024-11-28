<script setup>
	import { HistoryItem } from '@/entities/history';
	import Button from 'primevue/button';
	import Skeleton from 'primevue/skeleton';
	const emits = defineEmits([
		'delete-story',
		'select-story',
		'deselect-story',
		'clear-filters',
	]);
	const props = defineProps({
		stories: { type: Array, default: [] },
		loading: { type: Boolean, default: false },
		needClearFilters: { type: Boolean, default: false },
	});
</script>

<template>
	<div v-if="needClearFilters" class="history-list history-list_clear-filters">
		<div>По данным фильтрам нет историй</div>
		<Button
			label="Очистить фильтры"
			@click="$emit('clear-filters')"
			severity="secondary"
		/>
	</div>
	<template v-else-if="loading">
		<Skeleton v-for="i in 4" :key="`skeleton_${i}`" height="164px" />
	</template>

	<div v-else-if="stories.length" class="history-list">
		<transition-group name="list">
			<history-item
				v-for="item in stories"
				:key="item"
				:story="item"
				@delete-story="emits('delete-story', item.id)"
				@select-story="emits('select-story', item.id)"
				@deselect-story="emits('deselect-story', item.id)"
			/>
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
