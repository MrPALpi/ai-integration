<script setup>
	import Skeleton from 'primevue/skeleton';
	defineOptions({ inheritAttrs: false });
	const props = defineProps({
		message: {
			type: Object,
			required: true,
			default: () => ({ type: 'question', text: '', loading: false }),
		},
	});
</script>

<template>
	<div :class="`message message_${message.type}`">
		<img
			class="message__avatar"
			src="@/shared/assets/hound-app.webp"
			alt="message-avatar"
		/>
		<div class="message__text">
			<transition name="fade">
				<div v-if="message.loading">
					<Skeleton class="message__skeleton" width="270px" height="8px" />
					<Skeleton class="message__skeleton" width="270px" height="8px" />
					<Skeleton class="message__skeleton" width="270px" height="8px" />
				</div>
				<template v-else>
					{{ message.text }}
				</template>
			</transition>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.message {
		@include flex-list(5px);
		align-items: flex-end;
		max-width: 80%;
		position: relative;

		&_question {
			flex-direction: row-reverse;
			align-self: flex-end;
		}

		&__text {
			padding: 10px;
			border-radius: 10px;
			word-break: break-word;
			font-weight: 600;
		}

		&__skeleton + &__skeleton {
			margin-top: 5px;
		}

		&_question &__text {
			color: var(--p-surface-950);
			background-color: $question;
		}

		&_answer &__text {
			background-color: $answer;
		}

		&__avatar {
			position: sticky;
			bottom: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		position: absolute;
	}
</style>
