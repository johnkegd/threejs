import * as THREE from 'three';

const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.2, 0.2, 0.2);
bush1.position.set(0.9, 0.1, 1.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.20, 0.20, 0.20);
bush2.position.set(-0.5, 0.03, 1.2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.10, 0.10, 0.10);
bush3.position.set(0.65, 0.04, 1.1);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.13, 0.15, 0.15);
bush4.position.set(-0.8, 0.05, 1.15);

export default [bush1, bush2, bush3, bush4];
