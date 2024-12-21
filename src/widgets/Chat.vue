<script setup>
	import { ChatContainer, useChatStore } from '@/entities/chat';
	import MessageList from './MessageList.vue';
	import { SendMessage } from '@/features/sendMessage';
	import Message from 'primevue/message';

	const chatStore = useChatStore();
	const removeError = (error) => {
		chatStore.removeError(error);
	};
</script>

<template>
	<chat-container>
		<template #content>
			<message-list />
		</template>
		<template #errors>
			<div class="chat__errors">
				<transition-group name="errors">
					<Message
						v-for="error in chatStore.errorsList"
						:key="error"
						severity="error"
						:closable="true"
						:life="5000"
						@close="removeError(error)"
						@life-end="removeError(error)"
						class="chat__errors-message"
					>
						{{ error }}</Message
					>
				</transition-group>
			</div>
		</template>
		<template #form>
			<send-message />
		</template>
	</chat-container>
</template>

<style lang="scss" scoped>
	.chat__errors {
		position: absolute;
		max-width: 100%;
		bottom: 150px;
		left: 50%;
		transform: translateX(-50%);
		@include flex-list-column(15px);
		align-items: center;
	}

	.chat__errors-message {
		width: max-content;
		max-width: 100%;
	}
	.errors-move,
	.errors-enter-active,
	.errors-leave-active {
		transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
	}

	.errors-enter-from,
	.errors-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}
</style>
