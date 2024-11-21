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

	const confirmDelete = (target, message, callback) => {
		confirm.require({
			target: target,
			message: message,
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
			accept: callback,
		});
	};
	const deleteAll = (event) => {
		confirmDelete(
			event.currentTarget,
			'Are you sure you want delete all stories?',
			() => {
				toast.info('Confirmed', 'stories was deleted');
			}
		);
	};

	const deleteSelected = (event) => {
		confirmDelete(
			event.currentTarget,
			'Are you sure you want delete selected stories?',
			() => {
				toast.info('Confirmed', 'selected stories was deleted');
			}
		);
	};

	const clearFilters = () => {
		offset.value = 0;
		dates.value = [];
	};

	const {
		stories,
		selectedStories,
		dates,
		total,
		limit,
		offset,
		loading,
		rowsPerPage,
		deleteStory,
		selectStory,
		deselectStory,
		needClearFilters,
	} = useStories();
</script>
<template>
	<div class="history">
		<Toolbar>
			<template #start>
				<div class="history__toolbar-start">
					<Button
						@click="deleteAll"
						label="Очистить"
						icon="pi pi-trash"
						severity="danger"
					/>
					<Button
						@click="deleteSelected"
						label="удалить"
						:badge="(selectedStories.length || '').toString()"
						:disabled="selectedStories.length === 0"
						badgeClass="history__toolbar-badge"
						severity="danger"
					/>
				</div>
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
			:need-clear-filters="needClearFilters"
			@delete-story="deleteStory"
			@select-story="selectStory"
			@deselect-story="deselectStory"
			@clear-filters="clearFilters"
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

<style lang="scss">
	.history {
		display: grid;
		gap: 20px;
	}

	.history__toolbar-start {
		@include flex-list-wrap(10px, 10px);
	}

	.history__toolbar-badge {
		order: -1;
		text-align: center;
	}
</style>
