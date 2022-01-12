import * as THREE from 'three';

const graves = new THREE.Group();

const graveGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
    const angle = (Math.random() * Math.PI) * 2; // Random angle
    const radius = 3 + Math.random() * 6; // Random radius
    const x = Math.cos(angle) * radius; // Get the x position
    const z = Math.sin(angle) * radius; // Get the z position

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.2, z);

    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;

    graves.add(grave);
}

export default graves;