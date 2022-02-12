<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/threejs/scroll';

	let canvas;
	let guiContainer;
	let width;
	let height;

	onMount(() => {
		createScene(canvas, guiContainer, { width, height });
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<canvas bind:this={canvas} />
<section class="section">
	<h1>My Portfolio</h1>
</section>
<section class="section">
	<h2>My projects</h2>
</section>
<section class="section">
	<h2>Contact me</h2>
</section>
<div class="lil-gui autoPlace" bind:this={guiContainer} />

<style>
	.section * {
		display: flex;
		align-items: center;
		height: 100vh;
		position: relative;
		font-family: 'Cabin', sans-serif;
		color: #ffeded !important;
		text-transform: uppercase;
		font-size: 7vmin;
		padding-left: 10%;
		padding-right: 10%;
	}

	section:nth-child(odd) {
		justify-content: flex-end;
	}

	canvas {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
	}
</style>
