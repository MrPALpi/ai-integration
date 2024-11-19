<script setup>
	import Toast from 'primevue/toast';
	import AppLayout from './providers/router/ui/layouts/AppLayout.vue';
	import ConfirmPopup from 'primevue/confirmpopup';
</script>

<template>
	<Toast />
	<ConfirmPopup />
	<app-layout>
		<Suspense>
			<RouterView />
		</Suspense>
	</app-layout>
</template>
