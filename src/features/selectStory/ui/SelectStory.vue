<script setup>
	import { shallowRef } from 'vue';
	import { useHistoryStore } from '@/entities/history';
	import Checkbox from 'primevue/checkbox';
	const props = defineProps({
		id: { type: Number, required: true },
		checked: { type: Boolean, default: false, required: false },
	});

	const history = useHistoryStore();
	const checkbox = shallowRef(props.checked);
</script>
<template>
	<Checkbox
		v-model="checkbox"
		size="large"
		@change="
			checkbox.length ? history.selectStory(id) : history.deselectStory(id)
		"
		:value="id"
		name="story"
	/>
</template>

<style lang="scss" scoped></style>
