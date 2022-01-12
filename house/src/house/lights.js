import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 1.2, 1.5);



// Optimizations
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 15;

moonLight.castShadow = true;
doorLight.castShadow = true;

export default [doorLight, moonLight, ambientLight];;