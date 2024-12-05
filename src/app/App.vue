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
			<router-view v-slot="{ Component, route }">
				<transition :name="route.meta.transition || 'fade'" mode="out-in">
					<component :is="Component" :key="route.path" />
				</transition>
			</router-view>
		</Suspense>
	</app-layout>
</template>

<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.slide-right-enter-active,
	.slide-left-enter-active {
		transition: all 0.2s ease-out;
	}

	.slide-right-leave-active,
	.slide-left-leave-active {
		transition: all 0.2s ease-in;
	}

	.slide-right-enter-from,
	.slide-left-leave-to {
		transform: translateX(100px);
		opacity: 0;
	}

	.slide-left-enter-from,
	.slide-right-leave-to {
		transform: translateX(-100px);
		opacity: 0;
	}
</style>
