<script setup>
	import Button from 'primevue/button';
	import { useConfirm } from 'primevue/useconfirm';
	import { confirmData } from '../staticData/confirmData';
	import * as toast from '@/shared/lib/toast';
	const confirm = useConfirm();

	const deleteAll = (event) => {
		confirm.require({
			target: event.currentTarget,
			message: 'Are you sure you want delete all stories?',
			accept: () => {
				toast.info('Confirmed', 'stories was deleted');
			},
			...confirmData,
		});
	};
</script>
<template>
	<Button
		@click="deleteAll"
		label="Очистить"
		icon="pi pi-trash"
		severity="danger"
	/>
</template>

<style lang="scss" scoped></style>
