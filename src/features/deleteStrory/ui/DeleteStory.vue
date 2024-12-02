<script setup>
	import Button from 'primevue/button';
	import { deleteStory } from '../model';

	const props = defineProps({
		id: { type: Number, required: true },
	});
</script>
<template>
	<Button
		@click="deleteStory(id)"
		icon="pi pi-times"
		severity="danger"
		aria-label="Delete"
		size="small"
	/>
</template>

<style lang="scss" scoped></style>
