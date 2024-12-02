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
	<div class="chat chat-container">
		<div class="chat__content">
			<message-list :messages="messages" />
		</div>
		<div class="chat__wrapper-form chat-container">
			<form class="chat__form" @submit.prevent="submit">
				<Textarea v-model="question" class="chat__input" id="chat-input" autoResize  fluid rows="1" autofocus/>
				<DatePicker
					v-model="dates"
					dateFormat="dd.mm.yy"
					selectionMode="range"
					:manualInput="false"
					showButtonBar
					showIcon 

				/>
				<Button type="submit" icon="pi pi-send" variant="text" rounded  class="chat__submit"/>
			</form>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	.chat-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 10px;
	}
	.chat__content {
		height: 70vh;
		overflow-y: auto;
		margin-bottom: 20px;
		@include thin-scrollbar;
	}

	.chat__input {
		resize: none;
    border: none;
    background-color: transparent;
    min-height: 36px;
		max-height: 50vh;
		@include thin-scrollbar;
		overflow-y: auto !important;
	}

  .chat__wrapper-form {
		border-radius: 12px;
		border: 2px solid var(--p-button-primary-background);
    overflow: hidden;
		padding-top: 10px;
		padding-bottom: 10px
  }
	.chat__form {
		@include flex-list(10px);
		align-items: flex-end;
	}

  .chat__submit {
    flex-shrink: 0;
  }
</style>
