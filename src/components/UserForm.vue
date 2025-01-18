<template>
	<div
		class="bg-background rounded-2xl px-4 lg:px-8 py-3 lg:w-9/12 mx-auto mt-4 overflow-y-auto h-[90%] z-50">
		<Form :validation-schema="UserFormSchema" @submit="onSubmit">
			<h1 class="text-xl font-bold">Register a new user</h1>
			<FormBody />
			<div class="text-center">
				<Button
					type="submit"
					class="md:w-6/12 mt-4 text-white bg-[#80cbc4] font-bold py-2 px-4 rounded-lg mx-auto">
					Register
				</Button>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
import { UserFormSchema } from "../lib/utils";
import { Form } from "vee-validate";
import { useUserStore } from "@/stores/users-store/users-store";
import FormBody from "./FormBody.vue";
import { toast } from "./ui/toast";

function onSubmit(values: any, { resetForm }: { resetForm: Function }) {
	const userStore = useUserStore();
	console.log(values);
	userStore.addUser(values);

	resetForm();
	toast({
		description: "User created successfully",
	});
}
</script>
