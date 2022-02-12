<script>
	import { onMount } from 'svelte';
	import { createScene, cameraUpdater } from '$lib/threejs/demos';
	import { displayFooter } from './store';

	displayFooter.set(false);

	let el;
	let guiContainer;
	let width;
	let height;

	onMount(() => {
		createScene(el, guiContainer, { width, height });
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={cameraUpdater} />

<div class="demo-container">
	<canvas bind:this={el} {width} {height} />
	<div class="lil-gui autoPlace" bind:this={guiContainer} />
</div>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
	}
</style>
