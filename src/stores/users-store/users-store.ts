import { defineStore } from "pinia";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	state: string;
	phoneNumber: string;
	details: string;
	activeUser: boolean;
}

export const useUserStore = defineStore("userStore", {
	state: () => ({
		users: [] as User[],
	}),
	actions: {
		addUser(user: User) {
			const newUser = { ...user, index: this.users.length };
			this.users.push(newUser);
		},
		removeUser(index: number) {
			this.users.splice(index, 1);
		},
		getUser(index: number) {
			return this.users.find((_, i) => i === index);
		},
		updateUser(index: number, updatedUser: User) {
			this.users[index] = updatedUser;
		},
		searchUsers(searchTerm: string) {
			const baseSearch = searchTerm.toLowerCase();
			if (baseSearch === "active") {
				return this.users.filter((u) => u.activeUser);
			} else if (baseSearch === "inactive") {
				return this.users.filter((u) => !u.activeUser);
			} else {
				return this.users.filter((user) =>
					Object.values(user).some((value) =>
						value.toString().toLowerCase().includes(baseSearch)
					)
				);
			}
		},
		isDuplicate(user: User) {
			return this.users.some(
				(u) => u.email === user.email || u.phoneNumber === user.phoneNumber
			);
		},
	},
	getters: {
		totalCount: (state) => {
			return state.users.length;
		},
		topState(state) {
			const stateCounts: Record<string, number> = {};

			for (const user of state.users) {
				const state = user.state;
				stateCounts[state] = (stateCounts[state] || 0) + 1;
			}

			return Object.entries(stateCounts)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 3)
				.map(([state, count]) => ({ name: state, total: count }));
		},

		activeUsers: (state) => {
			return state.users.reduce((acc, user) => {
				return user.activeUser ? acc + 1 : acc;
			}, 0);
		},
	},
	persist: {
		pick: ["users"],
		storage: localStorage,
	},
});
