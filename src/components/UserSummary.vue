<template>
	<div class="flex flex-col lg:flex-row w-[95%] mx-auto gap-2 my-5">
		<Card class="h-[20%] md:h-full lg:w-4/12 pt-4" v-if="data.length">
			<DonutChart
				index="name"
				:category="'total'"
				:data="data"
				:showToolTip="true"
				:type="'pie'"
				:colors="['#7986cb', '#90caf9', '#80cbc4']" />
			<div>
				<div class="flex justify-center items-center my-4">
					<h2 class="text-sm">Top User State(s)</h2>
				</div>
				<div class="flex flex-wrap gap-2 px-2 my-4 justify-center">
					<div class="flex items-center" v-if="data[0]">
						<div class="w-6 h-6 rounded-full bg-[#7986cb]"></div>
						<p class="ml-2 text-sm font-semibold">{{ data[0].name }}</p>
					</div>
					<div class="flex items-center" v-if="data[1]">
						<div class="w-6 h-6 rounded-full bg-[#90caf9]"></div>
						<p class="ml-2 text-sm font-semibold">{{ data[1].name }}</p>
					</div>
					<div class="flex items-center" v-if="data[2]">
						<div class="w-6 h-6 rounded-full bg-[#80cbc4]"></div>
						<p class="ml-2 text-sm font-semibold">{{ data[2].name }}</p>
					</div>
				</div>
			</div>
		</Card>
		<Card class="flex-grow py-6 ps-6 pr-2 bg-[#80cbc4] overflow-y-hidden">
			<h2 class="text-sm font-semibold">Users Summary</h2>
			<div class="flex flex-col md:flex-row h-full">
				<div
					class="flex flex-col justify-end items-end pr-4 pb-3 md:w-6/12 order-2">
					<div class="space-y-2">
						<div class="flex items-center">
							<div class="w-8 h-3 rounded-full bg-blue-500"></div>
							<p class="ml-2 text-sm font-semibold">
								Total Users: {{ userStore.totalCount }}
							</p>
						</div>
						<div class="flex items-center" v-if="userStore.activeUsers">
							<div class="w-8 h-3 rounded-full bg-green-500"></div>
							<p class="ml-2 text-sm font-semibold">
								Active Users: {{ userStore.activeUsers }}
							</p>
						</div>
					</div>
				</div>
				<div class="w-full h-[400px] lg:h-full">
					<div class="w-full mx-auto mt-2 h-full relative">
						<div
							class="glass w-[240px] h-[240px] rounded-full absolute right-3 top-0 flex justify-center items-center">
							<div
								class="bg-blue-500 rounded-full w-[200px] h-[200px] flex flex-col justify-center items-center filter blur-lg animate-pulse"></div>
						</div>
						<!-- <div class="absolute right-24 top-28 text-center">
							<p class="text-sm font-semibold">{{ userStore.totalCount }}</p>
							<p class="text-xs">No of users</p>
						</div> -->

						<div
							class="glass w-[180px] h-[180px] rounded-full absolute left-2 md:left-24 bottom-5 flex justify-center items-center">
							<div
								class="bg-green-500 rounded-full w-[130px] h-[130px] flex flex-col justify-center items-center filter blur-lg animate-pulse"></div>
						</div>

						<!-- <div class="absolute left-14 md:left-36 bottom-24 text-center">
							<p class="text-sm font-semibold">{{ userStore.activeUsers }}</p>
							<p class="text-xs">Active users</p>
						</div> -->
					</div>
				</div>
			</div>
		</Card>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/users-store/users-store";
import { DonutChart } from "@/components/ui/chart-donut";
import { Card } from "./ui/card";
import { computed } from "vue";

const userStore = useUserStore();

const data = computed(() => {
	return userStore.topState;
});
</script>

<style scoped>
.glass {
	background-color: rgba(225, 255, 255, 0.3);
	box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(10px);
}
</style>
