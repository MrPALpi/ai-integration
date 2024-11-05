<script setup>
	import NavBar from '@/widgets/NavBar.vue';
</script>

<template>
	<header class="header container">
		<nav-bar />
	</header>
	<main class="container content">
		<slot />
	</main>
</template>
<style lang="scss" scoped>
	.header {
		padding: 40px 0;
	}
</style>
