<script setup>
	import { useStories } from '@/entities/history';
	import HistoryList from '@/widgets/HistoryList.vue';
	import DatePicker from 'primevue/datepicker';
	import Paginator from 'primevue/paginator';
	import Toolbar from 'primevue/toolbar';
	import Button from 'primevue/button';
	import * as toast from '@/shared/lib/toast';
	import { useConfirm } from 'primevue/useconfirm';
	const confirm = useConfirm();

	const deleteAll = (event) => {
		confirm.require({
			target: event.currentTarget,
			message: 'Are you sure you want delete all stories?',
			icon: 'pi pi-info-circle',
			rejectProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptProps: {
				label: 'Delete',
				severity: 'danger',
			},
			accept: () => {
				toast.info('Confirmed', 'stories was deleted');
			},
		});
	};

	const {
		stories,
		dates,
		total,
		limit,
		offset,
		loading,
		rowsPerPage,
		deleteStory,
	} = useStories();
</script>
<template>
	<div class="history">
		<Toolbar>
			<template #start>
				<Button
					@click="deleteAll"
					label="Очистить"
					icon="pi pi-trash"
					severity="danger"
				/>
				<Button label="Удалить" severity="danger" :disabled="false" />
			</template>
			<template #end>
				<DatePicker
					v-model="dates"
					dateFormat="dd.mm.yy"
					selectionMode="range"
					:manualInput="false"
					showButtonBar
					showIcon
				/>
			</template>
		</Toolbar>

		<history-list
			:stories="stories"
			:loading="loading"
			@delete-story="deleteStory"
		/>

		<paginator
			:total-records="total"
			:rows="limit"
			:rowsPerPageOptions="rowsPerPage"
			:first="offset"
			@page="
				({ page, rows }) => {
					offset = page * rows;
					limit = rows;
				}
			"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.history {
		display: grid;
		gap: 20px;
	}
</style>
