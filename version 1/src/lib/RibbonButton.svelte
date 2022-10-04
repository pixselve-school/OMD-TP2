{#if title !== ""}
	<div class='flex flex-col items-center'>
		<button on:click={() => dispatch("click")} class='hover:bg-black/10 p-1'>
			<slot></slot>
		</button>
		<div>{title}</div>
	</div>
{:else }
	<button on:click={() => dispatch("click")} class='hover:bg-black/10 p-1'>
		<slot></slot>
	</button>
{/if}


<script lang='ts'>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
export let title = '';
</script>
