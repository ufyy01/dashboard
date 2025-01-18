<template>
	<div
		v-if="props.openModal"
		@click.self="closeModal"
		class="fixed inset-0 flex items-center justify-center w-full bg-black/30 backdrop-blur-md z-30">
		<div class="h-full">
			<slot></slot>
			<Button
				size="sm"
				class="absolute top-[7%] right-[3%] lg:right-[10%] bg-[#80cbc4] w-fit flex justify-center cursor-pointer mb-4 z-[1000]"
				@click="closeModal">
				<p>X</p>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Button } from "./ui/button";

const props = defineProps({
	openModal: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits(["close"]);

function closeModal() {
	emit("close");
}
</script>

<style scoped></style>
