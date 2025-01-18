<script setup lang="ts">
import Toaster from "./components/ui/toast/Toaster.vue";
import Dashboard from "./pages/Dashboard.vue";
</script>

<template>
	<div class="max-w-screen min-h-screen diagonal-lines-bg">
		<Dashboard />
	</div>
	<Toaster />
</template>

<style scoped>
@keyframes moveLines {
	from {
		background-position: 0 0;
	}
	to {
		background-position: 100% 100%;
	}
}

.diagonal-lines-bg {
	background-image: linear-gradient(
			45deg,
			rgba(239, 238, 238, 0.865) 25%,
			transparent 25%
		),
		linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%);
	background-size: 50px 50px;
	animation: moveLines 40s linear infinite;
}
</style>
