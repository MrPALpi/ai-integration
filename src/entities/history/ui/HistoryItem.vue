<script setup>
	import { humanDate } from '@/shared/lib/humanDate';
	import Card from 'primevue/card';

	const props = defineProps({
		story: { type: Object, default: {} },
	});
</script>
<template>
	<card class="history-item">
		<template #header>
			<div class="history-item__header">
				<slot name="header" />
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
