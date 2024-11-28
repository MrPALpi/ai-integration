<template>
	<div class="message">
		{{ text }}
	</div>
</template>

<script setup>
	const props = defineProps({
		text: {
			type: String,
			required: true,
		},
	});
</script>

<style lang="scss" scoped>
	.message {
		max-width: 40%;
		padding: 10px;
		border-radius: 10px;
		word-break: break-word;
	}
</style>
