<script setup>
	import { ChatMessage, useChatStore } from '@/entities/chat';

	const chatStore = useChatStore();
</script>

<template>
	<div class="message-list">
		<transition-group name="message-list">
			<chat-message
				v-for="message in chatStore.messages"
				:key="message"
				:message="message"
			/>
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
