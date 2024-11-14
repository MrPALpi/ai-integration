<script setup>
	import { HistoryItem } from '@/entities/history';
	const emits = defineEmits(['delete-story']);
	const props = defineProps({
		stories: { type: Array, default: [] },
		loading: { type: Boolean, default: false },
	});
</script>

<template>
	<i
		class="pi pi-spin pi-spinner loading"
		v-if="loading"
		style="font-size: 100px; color: white"
	></i>
	<div v-else-if="stories.length" class="history-list">
		<transition-group name="list">
			<history-item
				v-for="item in stories"
				:key="item"
				:story="item"
				@delete-story="emits('delete-story', item.id)"
			/>
		</transition-group>
	</div>

	<template v-else> Историй пока нет </template>
</template>

<style lang="scss" scoped>
	.history-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.loading {
		font-size: 100px;
	}
	.list-move,
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}

	.list-leave-active {
		position: absolute;
	}
</style>
