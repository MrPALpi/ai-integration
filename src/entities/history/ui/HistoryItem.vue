<script setup>
	import { shallowRef } from 'vue';
	import { humanDate } from '@/shared/lib/humanDate';
	import Checkbox from 'primevue/checkbox';
	import Button from 'primevue/button';
	import Card from 'primevue/card';

	const checked = shallowRef(false);

	const emits = defineEmits(['deleteStory', 'deleteStories']);
	const props = defineProps({
		story: { type: Object, default: {} },
	});
</script>
<template>
	<card class="history-item">
		<template #header>
			<div class="history-item__header">
				<Checkbox
					:v-model="checked"
					size="large"
					:inputId="story.id"
					@change="emits('deleteStories', story.id)"
				/>
				<Button
					@click="emits('deleteStory', story.id)"
					icon="pi pi-times"
					severity="danger"
					aria-label="Delete"
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
	}

	.history-item__header {
		display: flex;
		justify-content: space-between;
	}
</style>
