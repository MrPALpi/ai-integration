<script setup>
	import { humanDate } from '@/shared/lib/humanDate';
	import Checkbox from 'primevue/checkbox';
	import Card from 'primevue/card';

	const emits = defineEmits(['deleteStory']);
	const props = defineProps({
		story: { type: Object, default: {} },
	});
</script>
<template>
	<card class="history-item">
		<template #header>
			<button
				class="p-button-text p-button-plain p-button-sm"
				@click="emits('deleteStory', story.id)"
			>
				<i class="pi pi-times" />
			</button>
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
</style>
