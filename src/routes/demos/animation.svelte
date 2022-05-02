<script>
	import { onMount } from 'svelte';
	import init, { resizeHandler } from '$lib/threejs/camera.js';

	let canvas, innerWidth, innerHeight;

	onMount(() => {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		window.setTimeout(() => {
			window.dispatchEvent(new CustomEvent('resize'));
		}, 0);
		init(canvas);
	});
</script>

<svelte:window
	bind:innerWidth
	bind:innerHeight
	on:resize={resizeHandler({ innerWidth, innerHeight })}
/>

<canvas bind:this={canvas} width={innerWidth} height={innerHeight} />

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
	}
</style>
