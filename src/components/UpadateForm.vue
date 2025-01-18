<template>
	<div
		class="bg-background rounded-2xl px-4 lg:px-6 py-3 lg:w-9/12 mx-auto mt-4 overflow-y-auto h-[90%] z-50">
		<Form
			:validation-schema="UserFormSchema"
			:initial-values="userDetail"
			@submit="onSubmit">
			<h1 class="text-xl font-bold">
				Update {{ userDetail?.firstName }}'s profile
			</h1>
			<FormBody />
			<div class="flex gap-1">
				<button
					type="submit"
					class="flex-grow md:w-6/12 mt-4 bg-[#80cbc4] text-white font-bold py-2 px-4 rounded-lg mx-auto">
					Update
				</button>
				<Dialog>
					<DialogTrigger asChild>
						<button
							type="button"
							class="md:w-4/12 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mx-auto flex items-center justify-center gap-2">
							<Icon icon="fa6-solid:trash-can" width="25" height="25" />
							<span class="hidden md:block">Delete user Profile</span>
						</button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle class="text-destructive"
								>Are you absolutely sure?</DialogTitle
							>
							<DialogDescription>
								This action cannot be undone. This will permanently delete user
								profile.
							</DialogDescription>
						</DialogHeader>
						<DialogClose class="text-center" asChild>
							<Button type="button" class="bg-destructive" @click="deleteUser"
								>Delete</Button
							>
						</DialogClose>
					</DialogContent>
				</Dialog>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
import { UserFormSchema } from "../lib/utils";
import { Form } from "vee-validate";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useUserStore } from "@/stores/users-store/users-store";

import { computed } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import FormBody from "./FormBody.vue";
import Button from "./ui/button/Button.vue";
import { toast } from "./ui/toast";
import DialogClose from "./ui/dialog/DialogClose.vue";

const props = defineProps<{
	user: number;
}>();

const userStore = useUserStore();

const userDetail = computed(() => userStore.getUser(props.user));

const deleteUser = () => {
	userStore.removeUser(props.user);
	toast({
		description: "User deleted successfully",
	});
};

const onSubmit = (values: any) => {
	console.log(values);
	userStore.updateUser(props.user, values);
	toast({
		description: "User profile updated",
	});
};
</script>
