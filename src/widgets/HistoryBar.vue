<script setup>
	import Toolbar from 'primevue/toolbar';
	import DatePicker from 'primevue/datepicker';
	import { useHistoryStore } from '@/entities/history';
	import { DeleteStoryAll, DeleteStorySelected } from '@/features/deleteStrory';

	const history = useHistoryStore();
</script>

<template>
	<Toolbar>
		<template #start>
			<div class="history-toolbar__start">
				<delete-story-all />
				<delete-story-selected />
			</div>
		</template>
		<template #end>
			<DatePicker
				v-model="history.dates"
				dateFormat="dd.mm.yy"
				selectionMode="range"
				:manualInput="false"
				showButtonBar
				showIcon
			/>
		</template>
	</Toolbar>
</template>

<style lang="scss" scoped>
	.history-toolbar__start {
		@include flex-list-wrap(10px, 10px);
	}
</style>
