<script setup>
	import { nextTick, ref } from 'vue';
	import { useChatStore } from '../model';

	const chatStore = useChatStore();
	const chatContent = ref(null);

	const submit = () => {
		if (chatStore.loading.value) return;

		nextTick(() => {
			chatContent.value.scrollTop = chatContent.value.scrollHeight;
		});
	};
</script>
<template>
	<div @submit="submit" class="chat chat-container">
		<div ref="chatContent" class="chat__content">
			<slot name="content" />
		</div>
		<slot name="errors" />
		<slot name="form" />
	</div>
</template>

<style lang="scss" scoped>
	.chat {
		position: relative;
		padding: 10px;
	}

	.chat-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding-left: 10px;
		padding-right: 10px;
	}

	.chat__content {
		height: 65vh;
		overflow-y: auto;
		margin-bottom: 20px;
		scroll-behavior: smooth;
		scrollbar-width: none;
	}
</style>
