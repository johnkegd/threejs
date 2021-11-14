<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>Lessons</title>
</svelte:head>

<div class="content">
	<h1>Lessons archieve</h1>
	<div>
		<ul><li><a href="/lessons/transform-objects">05 Transform objects</a></li></ul>
		<ul><li><a href="/lessons/">06 comming</a></li></ul>
		<ul><li><a href="/lessons/">07 comming</a></li></ul>
		<ul><li><a href="/lessons/">08 comming</a></li></ul>
	</div>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
