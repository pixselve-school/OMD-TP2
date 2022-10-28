<script lang='ts'>
import { Application } from '../classes/Application';
import kittenImage from '$lib/assets/nicolas-pitone-cmGtw04WTY8-unsplash.jpg';
import capybaraImage from '$lib/assets/jaime-dantas-Fpvr7thkAf0-unsplash.jpg';
import unicornImage from '$lib/assets/fond.png';
import { Confetti } from 'svelte-confetti';
import { Theme } from '../classes/Theme';
import Ribbon from '$lib/Ribbon.svelte';
import { CopyCommand, CutCommand, ModifySelection, PasteCommand, PlayRecordCommand } from '../classes/Commands';
import { SelectionDirection, SelectionPart } from '../classes/Selection';

let textArea: ElementContentEditable & HTMLDivElement;

let themeImage = '';
let themeColor = 'bg-blue-500';
let currentTheme = Theme.Standard;

$: {
	switch (currentTheme) {
		case Theme.Standard:
			themeImage = '';
			themeColor = 'bg-blue-500';
			break;
		case Theme.Kitten:
			themeImage = kittenImage;
			themeColor = 'bg-pink-500';
			break;
		case Theme.Capybara:
			themeImage = capybaraImage;
			themeColor = 'bg-amber-900';
			break;
		case Theme.Unicorn:
			themeImage = unicornImage;
			themeColor = 'bg-purple-600';
			break;
	}
}

let application = new Application();

const duration = 2000;
let confettis = [];
let timeout;

function handleType(event: InputEvent) {
	if (currentTheme === Theme.Unicorn) {
		// get cursor x and y position on the screen
		const cursorPosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
		const cursorX = cursorPosition.x;
		const cursorY = cursorPosition.y;
		confettis = [...confettis, { cursorX, cursorY }];
		clearTimeout(timeout);
		timeout = setTimeout(() => confettis = [], duration);
	}

}

/**
 * Function to handle the keydown event
 * @param event the event
 */
function handleKey(event: KeyboardEvent) {
	if (event.key === 'Enter') {
		// new line is not allowed
		event.preventDefault();
	}
}

/**
 * Function to handle the copy event
 */
function handleCopy() {
	console.log('Copy action');
	const selection = window.getSelection();
	const start = selection.getRangeAt(0).startOffset;
	const end = selection.getRangeAt(0).endOffset;
	// check if selection is not empty
	if (start == end) {
		console.log('Nothing to copy');
		return;
	}
	application.executeCommand(new CopyCommand(application, start, end));
	console.log(`New application clipboard: "${ application.clipboard }"`);
}

/**
 * Function to handle the cut event
 */
function handleCut() {
	console.log('Cut action');
	const selection = window.getSelection();
	const start = selection.getRangeAt(0).startOffset;
	const end = selection.getRangeAt(0).endOffset;
	// check if selection is not empty
	if (start == end) {
		console.log('Nothing to cut');
		return;
	}
	application.executeCommand(new CutCommand(application, start, end));
	console.log(`New application clipboard: "${ application.clipboard }"`);
	// update the editor text
	textArea.textContent = application.text;
	// place the cursor after the cut text
	selection.removeAllRanges();
	const range = document.createRange();
	range.setStart(textArea.childNodes[0], start);
	range.collapse(true);
	selection.addRange(range);

}

/**
 * Function to handle the paste event
 */
function handlePaste() {
	console.log('Paste action');
	const selection = window.getSelection();
	const start = selection.getRangeAt(0).startOffset;
	const end = selection.getRangeAt(0).endOffset;
	// check if clipboard is not empty
	if (application.clipboard === '') {
		console.log('Nothing to paste');
		return;
	}
	application.executeCommand(new PasteCommand(application, start, end));
	// update the editor text
	textArea.textContent = application.text;
	// place the cursor after the pasted text
	selection.removeAllRanges();
	const range = document.createRange();
	range.setStart(textArea.childNodes[0], start + application.clipboard.length);
	range.collapse(true);
	selection.addRange(range);
}

function handleSelection(selectionData: { detail: { from: SelectionPart, direction: SelectionDirection } }) {
	console.log('Selection action');
	application.executeCommand(new ModifySelection(application, selectionData.detail.from, selectionData.detail.direction));
}

/**
 * Function to handle the undo event
 */
function handleUndo() {
	console.log('Undo action');
	application.undoCommand();
	textArea.textContent = application.text;
}

/**
 * Function to handle the redo event
 */
function handleRedo() {
	console.log('Redo action');
	application.redoCommand();
	textArea.textContent = application.text;
}

function handleStartRecording() {
	console.log('Started recording');
	application.startRecording();
	containsRecording = false;
}

function handleStopRecording() {
	console.log('Stopped recording');
	application.stopRecording();
	containsRecording = true;
}

function handlePlayRecording() {
	console.log('Started playing');
	application.executeCommand(new PlayRecordCommand(application));
	textArea.textContent = application.text;
}

let containsRecording = false;
</script>

<header class='{themeColor} p-1 text-white text-center'>
	Document 1 · 🐱 Kitten Editor
</header>

<Ribbon on:copy={handleCopy} on:paste={handlePaste} on:cut={handleCut} bind:theme={currentTheme}
				on:selection={handleSelection} on:undo={handleUndo} on:redo={handleRedo} on:record={handleStartRecording}
				on:stopRecord={handleStopRecording} on:play={handlePlayRecording} containsRecording={containsRecording}></Ribbon>
<main class='bg-gray-200 p-4 h-full bg-local bg-cover' style='background-image: url({themeImage})'>
	<div on:copy|preventDefault={handleCopy} on:paste|preventDefault={handlePaste} on:cut|preventDefault={handleCut}
			 on:contextmenu|preventDefault={() => {}} on:keydown={handleKey} on:input={handleType} contenteditable='true'
			 bind:this={textArea}
			 class='max-w-5xl m-auto bg-white h-full outline-none p-24 drop-shadow-lg border-[1px] border-gray-300 text-xl relative overflow-y-scroll empty:before:content-[attr(data-placeholder)] empty:before:text-black/30 empty:before:italic'
			 data-placeholder='✏️ Il était une fois...'
			 bind:textContent={application.text}>
	</div>


	{#each confettis as thing}
		<div class='mover' style='position: absolute; left: {thing.cursorX}px; top: {thing.cursorY}px'>
			<Confetti y={[-0.5, 0.5]} fallDistance='20px' amount='10' {duration} />
		</div>
	{/each}

</main>



