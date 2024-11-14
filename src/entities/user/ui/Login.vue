<script setup>
	import { shallowRef } from 'vue';

	import Button from 'primevue/button';
	import LoginForm from '@/shared/ui/LoginForm.vue';

	import { login, loading } from '../api/index.js';
	import { useRouter } from 'vue-router';
	import { useUserStore } from '../model/';

	const router = useRouter();
	const userStore = useUserStore();

	const submit = async ({ email, password }) => {
		const res = await login(email, password, navigator.userAgent);
		if (res.token) {
			userStore.setUser({ email: email, token: res.token });
			router.push({ name: 'Chat' });
		}
	};
</script>

<template>
	<loginForm @submit-form="submit" :loading="loading">
		<template #title>Авторизация</template>
		<template #target-btn>
			<Button type="submit">Войти</Button>
		</template>
		<template #additional>
			<router-link
				:to="{ name: 'SignUp' }"
				class="p-button p-button-secondary p-component"
			>
				Зарегестрироваться
			</router-link>
		</template>
	</loginForm>
</template>
