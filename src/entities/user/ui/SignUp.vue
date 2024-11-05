<script setup>
	import { shallowRef } from 'vue';
	import Button from 'primevue/button';
	import LoginForm from '@/shared/ui/LoginForm.vue';

	import { signUp } from '../api/index.js';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const loading = shallowRef(false);

	const submit = async ({ email, password }) => {
		loading.value = true;
		try {
			const res = await signUp(email, password);

			if (res.id !== undefined) {
				router.push({ name: 'Login' });
			}
		} finally {
			loading.value = false;
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
