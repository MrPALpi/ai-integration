<script setup>
	import { selectedStoriesLength } from '../model';
	import { useConfirm } from 'primevue/useconfirm';
	import Button from 'primevue/button';
	import { confirmData } from '../staticData/confirmData';
	import * as toast from '@/shared/lib/toast';
	const confirm = useConfirm();

	const deleteSelected = (event) => {
		confirm.require({
			target: event.currentTarget,
			message: 'Are you sure you want delete selected stories?',

			accept: () => {
				toast.info('Confirmed', 'Selected stories was deleted');
			},
			...confirmData,
		});
	};
</script>
<template>
	<Button
		@click="deleteSelected"
		label="удалить"
		:badge="(selectedStoriesLength || '').toString()"
		:disabled="selectedStoriesLength === 0"
		class="delete-selected"
		badgeClass="delete-selected__badge"
		severity="danger"
	/>
</template>

<style lang="scss">
	.delete-selected {
		transition: opacity 0.2s;
	}

	.delete-selected__badge {
		order: -1;
		text-align: center;
	}
</style>
