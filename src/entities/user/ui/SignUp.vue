<script setup>
	import { shallowRef } from 'vue';
	import Button from 'primevue/button';
	import LoginForm from '@/shared/ui/LoginForm.vue';

	import { signUp, loading } from '../api/index.js';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const submit = async ({ email, password }) => {
		const res = await signUp(email, password);

		if (res.id !== undefined) {
			router.push({ name: 'Login' });
		}
	};
</script>

<template>
	<loginForm @submit-form="submit" :loading="loading">
		<template #title>Регистрация</template>
		<template #target-btn>
			<Button type="submit">Зарегестрироваться</Button>
		</template>
		<template #additional>
			<router-link
				:to="{ name: 'Login' }"
				class="p-button p-button-secondary p-component"
			>
				Войти
			</router-link>
		</template>
	</loginForm>
</template>
