<script setup>
	import { useChat } from '../api';
	import Textarea from 'primevue/textarea';
	import Button from 'primevue/button';
	import DatePicker from 'primevue/datepicker';
	import MessageList from './MessageList.vue';
	const { messages, dates, question, loading, invokeAssistant } = useChat();

	const submit = () => {
		console.log('submit	', loading.value);
		if (loading.value) return;
		messages.value.push({ type: 'question', message: question.value });
		invokeAssistant();
		question.value = '';
	};
</script>
<template>
	<div class="chat">
		<div class="chat-content">
			<message-list :messages="messages" />
		</div>
		<form class="chat__form" @submit.prevent="submit">
			<Textarea id="chat-input" class="chat__input" v-model="question" fluid />
			<DatePicker
				v-model="dates"
				dateFormat="dd.mm.yy"
				selectionMode="range"
				:manualInput="false"
				showButtonBar
				showIcon
			/>
			<Button type="submit" label="Отправить" />
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.chat {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 10px;
	}
	.chat-content {
		height: 60vh;
		overflow-y: auto;
	}

	.chat__input {
		resize: vertical;
		min-height: 4.5rem;
		max-height: 10rem;
		@include thin-scrollbar;
	}
</style>
