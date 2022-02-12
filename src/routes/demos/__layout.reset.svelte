<script>
	import Header from '$lib/header/Header.svelte';
	import { displayFooter } from './store';

	let activeFooter = true;

	displayFooter.subscribe((value) => {
		activeFooter = value;
	});
</script>

<Header class="demoHeader" ref="customHeader">
	<div class="projects" slot="header-submenu">
		<ul>
			<li><a href="/demos/galaxy">Galaxy</a></li>
			<li><a href="/demos/cementery">Cementery</a></li>
			<li><a href="/demos/raycaster">Raycaster</a></li>
			<li><a href="/demos/scroll">Scroll</a></li>
			<li><a href="/demos/soldier">Soldier</a></li>
		</ul>
	</div>
</Header>

<main>
	<slot />
</main>

{#if activeFooter}
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
{/if}

<style>
	:global([ref='customHeader']) {
		max-height: 100%;
		position: sticky;
		top: 0;
		z-index: 1001;
	}

	.projects {
		position: absolute;
		margin-left: 40px;
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

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none !important;
	}

	footer p {
		color: white;
	}

	footer a {
		font-weight: bold;
	}
</style>
