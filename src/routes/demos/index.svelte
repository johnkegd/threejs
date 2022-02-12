<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/threejs/scene';

	let el;

	onMount(() => {
		createScene(el);
	});
</script>

<div class="projects">
	<ul>
		<li><a href="/demos/galaxy">Galaxy</a></li>
		<li><a href="/demos/cementery">Cementery</a></li>
		<li><a href="/demos/raycaster">Raycaster</a></li>
		<li><a href="/demos/scroll">Scroll</a></li>
		<li><a href="/demos/soldier">Soldier</a></li>
	</ul>
</div>

<canvas bind:this={el} />

<style>
	.projects {
		position: absolute;
	}

	.projects ul {
		display: flex;
		list-style: none !important;
	}

	.projects ul li {
		position: relative;
		height: 100%;
	}

	.projects ul li a {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 0 1em;
		color: var(--pure-white);
		font-weight: 700;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
</style>
