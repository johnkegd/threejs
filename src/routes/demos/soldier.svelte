<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/threejs/soilder';

	let el;
	let container;

	onMount(() => {
		createScene(el, container);
	});
</script>

<div bind:this={container}>
	<canvas bind:this={el} />
</div>
