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
			data-gramm="false"
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
	emit("update:modelValue", value);
}

function toggleStyle(style: string, value?: string): void {
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0) return;

	const range = selection.getRangeAt(0);
	const parentElement = range.commonAncestorContainer.parentElement;

	if (!parentElement) return;

	if (style === "highlight") {
		if (
			parentElement.tagName === "SPAN" &&
			parentElement.style.backgroundColor === value
		) {
			removeStyle(range, parentElement); // Remove highlight
		} else {
			applyStyle(range, "span", value); // Apply highlight
		}
	} else {
		const tag = styleToTag(style);
		if (parentElement.tagName.toLowerCase() === tag) {
			removeStyle(range, parentElement); // Remove style
		} else {
			applyStyle(range, tag); // Apply style
		}
	}
}

function styleToTag(style: string): string {
	const tagMap: Record<string, string> = {
		bold: "b",
		italic: "i",
		underline: "u",
		strikethrough: "s",
	};

	return tagMap[style] || "";
}

function applyStyle(range: Range, tag: string, value?: string): void {
	if (!range || !tag) return;

	const element = document.createElement(tag);
	if (tag === "span" && value) {
		element.style.backgroundColor = value;
	}

	const extractedContent = range.extractContents();
	if (!extractedContent.textContent?.trim()) return;
	element.appendChild(extractedContent);
	range.insertNode(element);

	const newRange = document.createRange();
	newRange.setStartAfter(element);
	newRange.collapse(true);

	const selection = window.getSelection();
	selection?.removeAllRanges();
	selection?.addRange(newRange);
}

function removeStyle(range: Range, parentElement: HTMLElement): void {
	if (!parentElement || !parentElement.parentNode) return;

	const parentNode = parentElement.parentNode;

	while (parentElement.firstChild) {
		parentNode.insertBefore(parentElement.firstChild, parentElement);
	}

	parentNode.removeChild(parentElement);

	const selection = window.getSelection();
	const newRange = document.createRange();
	newRange.setStart(range.endContainer, range.endOffset);
	newRange.collapse(true);

	selection?.removeAllRanges();
	selection?.addRange(newRange);
}
</script>

<style scoped></style>
