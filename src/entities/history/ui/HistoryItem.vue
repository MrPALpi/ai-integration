<script setup>
	import { shallowRef } from 'vue';
	import Card from 'primevue/card';
	const props = defineProps({
		history: { type: Object, default: {} },
	});
</script>
<template>
	<card>
		<template #title>
			<router-link to="{{ history.url }}">
				<i class="pi pi-external-link" />
				{{ history.title }}
			</router-link>
		</template>
		<template #content>
			{{ history.url }}
		</template>
	</card>
</template>

<style lang="scss" scoped></style>
