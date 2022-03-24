<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/threejs/soilder';

	let el;
	let guiContainer;

	onMount(() => {
		createScene(el, guiContainer);
	});
</script>

<canvas bind:this={el} />
<div class="lil-gui autoPlace" bind:this={guiContainer} />

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
