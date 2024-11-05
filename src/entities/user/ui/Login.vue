<script setup>
	import { shallowRef } from 'vue';

	import Button from 'primevue/button';
	import LoginForm from '@/shared/ui/LoginForm.vue';

	import { login } from '../api/index.js';
	import { useRouter } from 'vue-router';
	import { useUserStore } from '../model/';

	const router = useRouter();
	const userStore = useUserStore();
	const loading = shallowRef(false);

	const submit = async ({ email, password }) => {
		loading.value = true;
		try {
			const res = await login(email, password, navigator.userAgent);
			if (res.token) {
				userStore.setUser({ email: email, token: res.token });
				router.push({ name: 'Chat' });
			}
		} finally {
			loading.value = false;
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
