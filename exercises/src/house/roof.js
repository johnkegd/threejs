import * as THREE from 'three';

const ceiling = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 2, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0xffb606 })
);
ceiling.position.y = 1.8;
ceiling.rotation.y = Math.PI / 4;


export default ceiling;