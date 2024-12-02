<template>
	<main class="login-page container content">
		<section class="login-page__wrapper">
			<slot />
		</section>
	</main>
</template>

<style lang="scss" scoped>
	.login-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}

	.login-page__wrapper {
		flex: 0 1 450px;
		position: relative;
	}
</style>
