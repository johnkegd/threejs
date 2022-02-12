<script>
	import Header from '$lib/header/Header.svelte';
	import '../../app.css';
</script>

<Header class="demoHeader" ref="customHeader" />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	:global([ref='customHeader']) {
		max-height: 100%;
		position: sticky;
		top: 0;
		z-index: 1001;
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
