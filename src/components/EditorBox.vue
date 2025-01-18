<template>
	<div class="border-2 rounded-sm mt-4">
		<div class="bg-gray-200 py-1 px-3 space-x-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							variant="outline"
							type="button"
							@click="toggleStyle('bold')"
							><b>B</b></Button
						></TooltipTrigger
					>
					<TooltipContent>
						<div>
							<b>Bold</b>
							<p>Make your text bold</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							variant="outline"
							type="button"
							@click="toggleStyle('italic')"
							><i>I</i></Button
						></TooltipTrigger
					>
					<TooltipContent>
						<div>
							<i>Italic</i>
							<p>Italicize your text</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild
						><Button
							size="sm"
							variant="outline"
							type="button"
							@click="toggleStyle('underline')"
							><u>U</u></Button
						></TooltipTrigger
					>
					<TooltipContent>
						<div>
							<u>Underline</u>
							<p>Underline your text</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild
						><Button
							size="sm"
							variant="outline"
							type="button"
							@click="toggleStyle('strikethrough')">
							<s>S</s>
						</Button></TooltipTrigger
					>
					<TooltipContent>
						<div>
							<s>Strikethrough</s>
							<p>Cross something out by drawing a line through</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							type="button"
							variant="outline"
							@click="toggleStyle('highlight', 'yellow')"
							class="text-black bg-yellow-300">
							H
						</Button></TooltipTrigger
					>
					<TooltipContent>
						<div>
							<p class="bg-yellow-300 text-black">Highlight your text</p>
							<p class="text-white">
								Make your text pop by highlighting it in a bright color
							</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>

		<div
			class="min-h-[120px] max-h-[150px] px-2 pt-2 overflow-y-auto"
			contenteditable="true"
			ref="editor"
			@input="onInput"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Button } from "./ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const props = defineProps<{
	modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const editor = ref<HTMLElement | null>(null);

onMounted(() => {
	if (editor.value && props.modelValue) {
		editor.value.innerHTML = props.modelValue;
	}
});

watch(
	() => props.modelValue,
	(newValue) => {
		if (editor.value && editor.value.innerHTML !== newValue) {
			editor.value.innerHTML = newValue;
		}
	}
);

function onInput(): void {
	const value = editor.value?.innerHTML || "";

	// Emit updated content to parent
	emit("update:modelValue", value);
}

// Toggle styles for the selected text
function toggleStyle(style: string, value?: string): void {
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0) return;

	const range = selection.getRangeAt(0);
	const parentElement = range.commonAncestorContainer.parentElement;

	if (!parentElement) return;

	if (style === "highlight") {
		// Check for highlight style
		if (
			parentElement.tagName === "SPAN" &&
			parentElement.style.backgroundColor === value
		) {
			// Remove highlight
			removeStyle(range, parentElement);
		} else {
			// Apply highlight
			applyStyle(range, "SPAN", value);
		}
	} else {
		// Check for other styles (e.g., bold, italic, underline)
		const tag = styleToTag(style);
		if (parentElement.tagName === tag) {
			// Remove the style
			removeStyle(range, parentElement);
		} else {
			// Apply the style
			applyStyle(range, tag);
		}
	}
}

// Convert style commands to HTML tags
function styleToTag(style: string): string {
	switch (style) {
		case "bold":
			return "B";
		case "italic":
			return "I";
		case "underline":
			return "U";
		case "strikethrough":
			return "S";
		default:
			return "";
	}
}

// Apply a style to the selected text
function applyStyle(range: Range, tag: string, value?: string): void {
	const element = document.createElement(tag);
	if (tag === "SPAN" && value) {
		element.style.backgroundColor = value;
	}
	element.appendChild(range.extractContents());
	range.insertNode(element);

	// Move the caret to the end of the newly inserted element
	const newRange = document.createRange();
	newRange.setStartAfter(element);
	newRange.collapse(true);

	const selection = window.getSelection();
	selection?.removeAllRanges();
	selection?.addRange(newRange);
}

// Remove a style by unwrapping the parent element
function removeStyle(range: Range, parentElement: HTMLElement): void {
	while (parentElement.firstChild) {
		parentElement.parentNode?.insertBefore(
			parentElement.firstChild,
			parentElement
		);
	}
	parentElement.remove();

	// Restore the caret position
	const selection = window.getSelection();
	const newRange = document.createRange();
	newRange.setStart(range.startContainer, range.startOffset);
	newRange.collapse(true);

	selection?.removeAllRanges();
	selection?.addRange(newRange);
}
</script>

<style scoped></style>
