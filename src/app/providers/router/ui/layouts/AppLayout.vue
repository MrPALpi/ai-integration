<script setup>
	import { useRoute } from 'vue-router';
	import { defineAsyncComponent, watch, shallowRef } from 'vue';

	import { layouts } from '../index.js';

	const route = useRoute();

	const layout = shallowRef(defineAsyncComponent(layouts.DEFAULT.component));

	watch(
		() => route.meta.layout,
		async (to, from) => {
			const nextLayout = to?.meta?.layout || layouts.DEFAULT;
			const prevLayout = from?.meta?.layout || layouts.DEFAULT;

			if (prevLayout?.name && nextLayout.name === prevLayout?.name) {
				return;
			}

			layout.value = defineAsyncComponent(nextLayout.component);
		}
	);
</script>

<template>
	<component :is="layout">
		<slot />
	</component>
</template>
