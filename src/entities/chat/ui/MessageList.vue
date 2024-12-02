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
	<transition-group name="message-list">
		<Message v-for="message in messages" :text="message.text" />
	</transition-group>
</template>

<style lang="scss" scoped>
	.message-list-item {
		@include flex-list-column(15px);
	}

	.message-list-enter-active,
	.message-list-leave-active {
		transition: all 0.2s ease-in-out;
	}

	.message-list-enter-from,
	.message-list-leave-to {
		transform: translateY(50px);
		opacity: 0;
	}
</style>
