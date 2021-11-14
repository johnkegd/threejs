<script>
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { onMount } from 'svelte';
	let canvas;
	let width, height;
	const sizes = {
		width: width,
		height: height
	};

	onMount(() => {
		init();
	});

	function init() {
		const scene = new THREE.Scene();

		let geometry = new THREE.BoxGeometry(1, 1, 1);
		let material = new THREE.MeshBasicMaterial({
			color: 0xfbb606,
			wireframe: false
		});

		let mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		let camera = new THREE.PerspectiveCamera(45, width / height);
		camera.position.z = 5;
		camera.position.y = 1;
		scene.add(camera);

		let axesHelper = new THREE.AxesHelper(3);
		scene.add(axesHelper);

		const renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true
		});

		renderer.setSize(width, height);
		renderer.render(scene, camera);

		let controls = new OrbitControls(camera, renderer.domElement);
	}
	/* eslint-disable */
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<section>
	<canvas bind:this={canvas} />
</section>

<style>
	canvas {
		border: 1px solid black;
	}

	section {
		width: 100%;
		max-width: 100%;
		margin: var(--canvas-column-margin-top) auto 0 auto;
		margin-left: -33%;
	}
</style>
