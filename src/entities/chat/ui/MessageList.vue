<script setup>
	import Message from './Message.vue';
	const props = defineProps({
		messages: {
			type: Array,
			default: () => [],
		},
	});
</script>

<template>
	<div class="message-list">
		<transition-group name="message-list">
		<Message v-for="message in messages" :key="message" :message="message" />
	</transition-group>
	</div>
</template>

<style lang="scss" scoped>
	.message-list {
		@include flex-list-column(15px);
		align-items: flex-start;
	}

	.message-list-enter-active,
	.message-list-leave-active {
		transition: all 0.2s ease-in-out;
	}

	.message-list-enter-from,
	.message-list-leave-to {
		transform: translateY(20px);
		opacity: 0;
	}
</style>
