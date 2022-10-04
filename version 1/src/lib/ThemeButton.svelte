<button on:click={() => dispatch("click")}
				class='rounded-lg h-full p-4 {active && "border-2 border-blue-500"}'>
	<div>{emoji}</div>
	<div>
		<slot></slot>
	</div>
</button>


<script lang='ts'>
import { createEventDispatcher } from 'svelte';

export let emoji;
export let active;

const dispatch = createEventDispatcher();

</script>

