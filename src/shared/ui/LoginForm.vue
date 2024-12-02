<script setup>
	import { useSlots, shallowRef } from 'vue';
	import Card from 'primevue/card';
	import FloatLabel from 'primevue/floatlabel';
	import InputText from 'primevue/inputtext';
	import Password from 'primevue/password';
	import Divider from 'primevue/divider';

	const email = shallowRef('');
	const password = shallowRef('');
	const emit = defineEmits(['submit-form']);
	const slots = useSlots();

	const submit = () => {
		emit('submit-form', { email: email.value, password: password.value });
	};

	const props = defineProps({
		loading: { type: Boolean, default: false },
		showLevelPassword: { type: Boolean, default: false },
	});
</script>

<template>
	<card class="login-form">
		<template #title>
			<div class="login-form__title"><slot name="title"></slot></div>
		</template>
		<template #content>
			<form
				@submit.prevent="submit"
				v-bind="$attrs"
				class="login-form__form"
				:class="{ 'login-form_loading': loading }"
			>
				<transition name="fade">
					<i v-if="loading" class="pi pi-spin pi-spinner login-form__spiner" />
				</transition>
				<float-label variant="in">
					<input-text
						v-model="email"
						id="email"
						class="login-form__input"
						autocomplete="true"
						:required="true"
						type="email"
						minlength="3"
						:fluid="true"
						:autofocus="true"
					/>
					<label for="email">Email</label>
				</float-label>

				<float-label variant="in">
					<Password
						v-model="password"
						:feedback="showLevelPassword"
						:fluid="true"
						toggleMask 
						id="password"
						class="login-form__input"
						autocomplete="true"
						:required="true"
						minlength="3"
					/>
					<label for="password">Password</label>
				</float-label>

				<slot name="target-btn" />
				<Divider
					v-if="slots.additional"
					class="login-form__divider"
					align="center"
					type="solid"
				>
					или
				</Divider>
				<slot name="additional" />
			</form>
		</template>
	</card>
</template>

<style lang="scss" scoped>
	.login-form {
		margin-bottom: 100px;  
		width: 100%;
	}

	.login-form__form {
		position: relative;
		margin-top: 30px;
		display: grid;
		gap: 15px;
		transition: opacity 0.2s;
	}

	.login-form__input {

		&:user-invalid {
			border-color: red;
		}
	}

	.login-form_loading {
		pointer-events: none;
		opacity: 0.4;
	}

	.login-form__spiner {
		position: absolute;
		z-index: 2;
		top: calc(50% - 50px);
		left: calc(50% - 50px);
		font-size: 100px;
	}

	.login-form__title {
		text-align: center;
	}

	.login-form__forgot-password {
		text-align: right;
	}

	.login-form__divider {
		margin: initial;
	}
</style>
