<template>
	<LoadingPage v-if="loading" />
	<div class="pb-10">
		<div
			class="w-[95%] my-2 mx-auto px-2 py-1 rounded-xl bg-card flex items-center justify-between">
			<div class="flex items-center">
				<Icon
					icon="ion:logo-firebase"
					width="50"
					height="50"
					style="color: #80cbc4" />
				<p class="text-sm">BYNFINANCE</p>
			</div>
			<div class="flex items-center gap-2">
				<div class="rounded-full bg-background w-fit p-2">
					<Icon icon="line-md:person-filled" width="35" height="35" />
				</div>
				<p class="text-sm hidden md:block">Welcome, Admin!</p>
			</div>
		</div>
		<div v-if="users.length">
			<UserSummary />
		</div>
		<Card class="pb-10 w-[95%] mx-auto">
			<div
				class="my-2 mx-auto px-2 py-1 rounded-xl bg-card flex items-center justify-between w-[95%]">
				<SearchBar v-model="search" />
				<div class="ms-2 flex items-center gap-4">
					<Button
						type="button"
						size="sm"
						@click="toggleModal"
						class="bg-[#80cbc4]"
						>+ Create</Button
					>
					<Modal :openModal="isModalOpen" @close="toggleModal">
						<UserForm />
					</Modal>
				</div>
			</div>

			<UserTable :users="filteredUsers" />
		</Card>
	</div>
	<Footer />
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import SearchBar from "@/components/SearchBar.vue";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card/Card.vue";
import UserForm from "@/components/UserForm.vue";
import UserSummary from "@/components/UserSummary.vue";
import UserTable from "@/components/UserTable.vue";
import { useUserStore } from "@/stores/users-store/users-store";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { computed, ref } from "vue";
import LoadingPage from "./LoadingPage.vue";
import Footer from "@/components/Footer.vue";

let loading = ref(true);

setTimeout(() => {
	loading.value = false;
}, 1500);

const userStore = useUserStore();

const users = computed(() => userStore.users);

const search = ref("");

const filteredUsers = computed(() => {
	if (!search.value) return users.value;
	console.log(search.value);
	return userStore.searchUsers(search.value);
});

const isModalOpen = ref(false);

function toggleModal() {
	isModalOpen.value = !isModalOpen.value;
}
</script>

<style scoped></style>
