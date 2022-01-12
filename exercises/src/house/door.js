import * as THREE from 'three';
import textureMapper from '../utils/textureMapper';

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 1),
    new THREE.MeshStandardMaterial({ color: 'orange' })
);
door.material.transparent = true;
textureMapper(door.material, "./textures/door/", 'jpg');

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.y = 0.45;
door.position.z = 1.001;


export default door;
