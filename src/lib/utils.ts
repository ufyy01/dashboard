import { toTypedSchema } from "@vee-validate/zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const UserFormSchema = toTypedSchema(
	z.object({
		firstName: z
			.string()
			.regex(/^[a-z]/i, {
				message: "First name must start with a letter",
			})
			.min(1, "First name is required"),
		lastName: z
			.string()
			.regex(/^[a-z]/i, {
				message: "Last name must start with a letter",
			})
			.min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		phoneNumber: z.string().regex(/^\+234[89][0-9]{9}$/, {
			message:
				"Invalid phone number. It must start with +2348 or +2349 and contain exactly 9 additional digits.",
		}),
		state: z.string().min(1, "State is required"),
		details: z
			.string()
			.min(10, "Details are required and must be at least 10 characters long"),
		activeUser: z.boolean().default(true),
	})
);
