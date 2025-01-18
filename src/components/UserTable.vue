<template>
	<div class="flex flex-col justify-center items-center mx-2 gap-3">
		<div v-if="users.length > 0" class="w-full px-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<div class="flex items-center justify-center w-full h-full gap-2">
								<input
									@click="toggleSelectAll"
									type="checkbox"
									class="p-2 accent-[#020721] border-2" />
								<p class="text-nowrap text-xs">Select all</p>
							</div>
						</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone Number</TableHead>
						<TableHead>State</TableHead>
						<TableHead>Status</TableHead>
						<TableHead> </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow
						class="w-full"
						v-for="(user, index) in props.users"
						:key="index">
						<TableCell>
							<div class="flex items-center justify-center w-full h-full">
								<input
									@click="toggleValue(index)"
									v-model="selectedUsers"
									:value="user"
									type="checkbox"
									class="p-2 accent-[#7b7d87] border-2" />
							</div>
						</TableCell>
						<TableCell @click="toggleModal(index)">
							<div class="flex gap-2 text-sm">
								<p>{{ user.firstName }}</p>
								<p>{{ user.lastName }}</p>
							</div>
						</TableCell>
						<TableCell @click="toggleModal(index)">
							<p>{{ user.email }}</p>
						</TableCell>
						<TableCell @click="toggleModal(index)">
							<p>{{ user.phoneNumber }}</p>
						</TableCell>
						<TableCell @click="toggleModal(index)">
							<p>{{ user.state }}</p>
						</TableCell>
						<TableCell @click="toggleModal(index)">
							<p
								:class="user.activeUser ? 'bg-green-500' : 'bg-red-300'"
								class="rounded-full py-1 px-2 w-fit text-xs">
								{{ user.activeUser ? "Active" : "Inactive" }}
							</p>
						</TableCell>
						<TableCell @click="toggleModal(index)">
							<Icon
								icon="line-md:chevron-triple-right"
								width="24"
								height="24" />
						</TableCell>
						<Modal
							v-if="modalIndex === index"
							:openModal="true"
							@close="toggleModal(null)">
							<UpadateForm :user="index" />
						</Modal>
					</TableRow>
				</TableBody>
			</Table>
			<Button type="button" size="sm" @click="exportToExcel" class="my-4"
				>Export CSV file</Button
			>
		</div>
		<p
			v-else
			class="h-screen flex justify-center items-center text-center p-3 text-gray-400">
			No user data found. Kindly click the create user button to add users.
		</p>
	</div>
</template>

<script setup lang="ts">
import type { User } from "@/stores/users-store/users-store";
import { Icon } from "@iconify/vue";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ref } from "vue";
import Modal from "./Modal.vue";
import UpadateForm from "./UpadateForm.vue";
import * as XLSX from "xlsx";
import { toast } from "./ui/toast";
import Button from "./ui/button/Button.vue";

const props = defineProps<{
	users: User[];
}>();

const modalIndex = ref<number | null>(null);

function toggleModal(index: number | null) {
	modalIndex.value = modalIndex.value === index ? null : index;
}

//export users
const selectedUsers = ref<User[]>([]);
const selectAll = ref(false);

const toggleSelectAll = () => {
	if (!selectAll.value) {
		selectedUsers.value = [...props.users];
	} else {
		selectedUsers.value = [];
	}
	selectAll.value = !selectAll.value;
};

const toggleValue = (index: number) => {
	if (index !== -1) {
		selectedUsers.value.splice(index, 1);
	} else {
		selectedUsers.value.push(props.users[index]);
	}
};

const exportToExcel = () => {
	if (selectedUsers.value.length === 0) {
		toast({
			description: "Please select a user to export",
		});
		return;
	}
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.json_to_sheet(selectedUsers.value);

	XLSX.utils.book_append_sheet(wb, ws, "Users");

	XLSX.writeFile(wb, "users.xlsx");
};
</script>

<style scoped>
table td {
	@apply text-sm;
}
</style>
