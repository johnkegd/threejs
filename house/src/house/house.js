import * as THREE from 'three';
import textureMapper from '../utils/textureMapper';

const house = new THREE.Group();

/*
walls, paredes
*/
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 2),
    new THREE.MeshStandardMaterial()
);

textureMapper(walls.material, "./textures/bricks/", "jpg");

walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
walls.position.y = 0.7;

/*
roof, ceiling, techo
*/

const ceiling = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 2, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0xffb606 })
);
ceiling.position.y = 1.8;
ceiling.rotation.y = Math.PI / 4;

/**
 * bush, grama circulos
 */
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

/**
 * door, puerta principal
 */
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 1),
    new THREE.MeshStandardMaterial({ color: 'orange' })
);
door.material.transparent = true;

textureMapper(door.material, "./textures/door/", 'jpg');

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.y = 0.45;
door.position.z = 1.001


house.add(walls, ceiling, bush1, bush2, bush3, bush4, door);
export default house;
