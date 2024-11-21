<script setup>
	import { shallowRef } from 'vue';
	import { humanDate } from '@/shared/lib/humanDate';
	import Checkbox from 'primevue/checkbox';
	import Button from 'primevue/button';
	import Card from 'primevue/card';

	const checkbox = shallowRef(false);

	const emits = defineEmits(['delete-story', 'select-story']);
	const props = defineProps({
		story: { type: Object, default: {} },
	});
</script>
<template>
	<card class="history-item">
		<template #header>
			<div class="history-item__header">
				<Checkbox
					v-model="checkbox"
					size="large"
					@change="
						checkbox.length
							? emits('select-story', story.id)
							: emits('deselect-story', story.id)
					"
					:value="story.id"
					name="story"
				/>
				<Button
					@click="emits('delete-story', story.id)"
					icon="pi pi-times"
					severity="danger"
					aria-label="Delete"
					size="small"
				/>
			</div>
		</template>
		<template #title>
			<a :href="story.url" target="_blank">
				<i class="pi pi-external-link" />
				{{ story.title }}
			</a>
		</template>
		<template #content>
			<div>
				{{ story.url }}
			</div>
			<div>
				{{ humanDate(story.viewed_at) }}
			</div>
		</template>
	</card>
</template>

<style lang="scss" scoped>
	.history-item {
		word-break: break-all;
		overflow: hidden;
	}

	.history-item__header {
		display: flex;
		justify-content: space-between;
		padding: 10px 10px 0;
	}
</style>
