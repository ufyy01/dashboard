<template>
	<div class="flex flex-wrap justify-between mb-4">
		<label>
			<span>First Name</span>
			<Field type="text" name="firstName" />
			<ErrorMessage class="text-xs text-red-400" name="firstName" />
		</label>

		<label>
			<span>Last Name</span>
			<Field type="text" name="lastName" />
			<ErrorMessage class="text-xs text-red-400" name="lastName" />
		</label>

		<label>
			<span>Email</span>
			<Field type="email" name="email" />
			<ErrorMessage class="text-xs text-red-400" name="email" />
		</label>

		<label>
			<span>Phone Number</span>
			<Field type="text" name="phoneNumber" placeholder="+2348000000000" />
			<ErrorMessage class="text-xs text-red-400" name="phoneNumber" />
		</label>

		<label>
			<span>State</span>
			<Field name="state" as="select">
				<option value="" disabled>Select State</option>
				<option v-for="state in nigerianState" :key="state" :value="state">
					{{ state }}
				</option>
			</Field>
			<ErrorMessage class="text-xs text-red-400" name="state" />
		</label>

		<label>
			<span>Status</span>
			<div class="flex my-2 w-5/12">
				<Field
					name="activeUser"
					type="checkbox"
					:value="true"
					:unchecked-value="false" />
				<p class="w-full text-sm">Active</p>
			</div>

			<ErrorMessage class="text-xs text-red-400" name="activeUser" />
		</label>
	</div>
	<label>
		<span>Details</span>
		<Field name="details" v-slot="{ field }">
			<EditorBox
				:modelValue="field.value || ''"
				@update:modelValue="field.onInput" />
		</Field>
		<ErrorMessage class="text-xs text-red-400" name="details" />
	</label>
</template>

<script setup lang="ts">
import EditorBox from "./EditorBox.vue";
import { Field, ErrorMessage } from "vee-validate";

const nigerianState = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"FCT - Abuja",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
];
</script>

<style lang="css">
label {
	@apply mt-4 w-full lg:w-[32%];
}

label span:first-of-type {
	@apply uppercase text-sm;
}
label input,
label select {
	@apply w-full border-2 rounded-sm p-2;
}
</style>
