<script setup>
	import NavBar from '@/widgets/NavBar.vue';
</script>

<template>
	<header class="header container">
		<nav-bar />
	</header>
	<main class="main container content">
		<slot />
	</main>
</template>
<style lang="scss" scoped>
	.header {
		padding-top: 40px;
		padding-bottom: 40px;
	}

	.main {
		position: relative;
	}
</style>
