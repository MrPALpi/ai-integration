<script setup>
	import { onUnmounted } from 'vue';
	import { useHistoryStore } from '@/entities/history';
	import { useRoute } from 'vue-router';
	import HistoryList from '@/widgets/HistoryList.vue';
	import HistoryBar from '@/widgets/HistoryBar.vue';
	import Paginator from 'primevue/paginator';

	const history = useHistoryStore();

	const route = useRoute();

	history.init(route.query);

	history.enableWatch();

	window.addEventListener('popstate', () => {
		history.setVarsFromQuery(route.query);
	});

	onUnmounted(() => {
		window.removeEventListener('popstate', () => {
			history.setVarsFromQuery(route.query);
		});
	});
</script>
<template>
	<div class="history">
		<history-bar />

		<history-list />

		<paginator
			:total-records="history.total"
			:rows="history.limit"
			:rowsPerPageOptions="history.rowsPerPage"
			:first="history.offset"
			@page="
				({ page, rows }) => {
					history.offset = page * rows;
					history.limit = rows;
				}
			"
		/>
	</div>
</template>

<style lang="scss">
	.history {
		display: grid;
		gap: 20px;
	}
</style>
