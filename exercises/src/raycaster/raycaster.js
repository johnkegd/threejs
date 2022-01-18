import * as THREE from 'three';


const geometry = new THREE.SphereGeometry(30, 10, 30);
const material = new THREE.MeshStandardMaterial({ color: "red" });

const mesh = new THREE.Mesh(geometry, material);

const raycaste = new THREE.Raycaster();

