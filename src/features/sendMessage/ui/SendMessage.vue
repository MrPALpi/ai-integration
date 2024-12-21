<script setup>
	import { useChatStore } from '@/entities/chat';
	import Textarea from 'primevue/textarea';
	import Button from 'primevue/button';
	import DatePickerText from '@/widgets/DatePickerText.vue';

	const chatStore = useChatStore();
	const submit = () => {
		if (chatStore.loading.value) return;
		chatStore.invokeAssistant();
	};

	const enter = (event) => !event.shiftKey && submit();
</script>
<template>
	<form class="chat-form" @submit.prevent="submit">
		<div class="chat-form__line">
			<Textarea
				@keyup.enter.prevent="enter"
				v-model="chatStore.question"
				class="chat-form__input"
				autoResize
				fluid
				rows="1"
				autofocus
				required
			/>

			<Button
				type="submit"
				icon="pi pi-send"
				variant="text"
				rounded
				class="chat-form__submit"
			/>
		</div>
		<div class="chat-form__line">
			<date-picker-text v-model="chatStore.dates" />
		</div>
	</form>
</template>

<style lang="scss" scoped>
	.chat-form {
		@include flex-list-column(10px);
		border-radius: 12px;
		border: 2px solid var(--p-button-primary-background);
		overflow: hidden;
		padding: 10px;
	}

	.chat-form__input {
		resize: none;
		border: none;
		background-color: transparent;
		min-height: 36px;
		max-height: 30vh;
		overflow-y: auto !important;
		scrollbar-width: none;
	}

	.chat-form__line {
		@include flex-list(10px);
		align-items: flex-end;
	}

	.chat-form__submit {
		flex-shrink: 0;
	}
</style>
