<script setup>
	import { useRouter } from 'vue-router';
	import { useUserStore } from '@/entities/user';
	import Toolbar from 'primevue/toolbar';
	import SplitButton from 'primevue/splitbutton';

	const router = useRouter();
	const user = useUserStore();
</script>

<template>
	<Toolbar class="nav-bar">
		<template #start>
			<div class="nav-bar__links">
				<router-link :to="{ name: 'Chat' }" class="nav-bar__link"
					>Чат</router-link
				>
				<router-link :to="{ name: 'History' }" class="nav-bar__link"
					>История</router-link
				>
			</div>
		</template>

		<template #end>
			<split-button
				:model="[
					{
						label: 'Профиль',
						icon: 'pi pi-user',
						command: () => {
							router.push({ name: `user/${user.email}` });
						},
					},
					{
						label: 'Выйти',
						icon: 'pi pi-times',
						command: () => {
							user.logout();
							router.push({ name: 'Login' });
						},
					},
				]"
			>
				{{ user.email }}
			</split-button>
		</template>
	</Toolbar>
</template>

<style lang="scss" scoped>
	.nav-bar {
		border-radius: 20px;
	}

	.nav-bar__links {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.nav-bar__link {
		position: relative;

		&::after {
			display: block;
			position: absolute;
			content: '';
			left: 0;
			width: 0;
			height: 2px;
			background-color: var(--p-button-primary-background);
			transition: width 0.3s ease-out;
			will-change: width;
		}

		&.router-link-active::after {
			width: 100%;
		}
	}
</style>
