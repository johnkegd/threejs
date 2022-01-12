import * as THREE from 'three';
import textureMapper from '../utils/textureMapper';
const floorTexturesPath = '/textures/grass/';

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)

textureMapper(floor.material, floorTexturesPath, 'jpg');
console.log(floor.material);

floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
floor.material.map.repeat.set(8, 8);
floor.material.aoMap.repeat.set(8, 8);
//floor.material.normalMap.repeat.set(8, 8);
floor.material.roughnessMap.repeat.set(8, 8);

floor.material.map.wrapS = THREE.RepeatWrapping;
floor.material.aoMap.wrapS = THREE.RepeatWrapping;
//floor.material.normalMap.wrapS = THREE.RepeatWrapping;
floor.material.roughnessMap.wrapS = THREE.RepeatWrapping;

floor.material.map.wrapT = THREE.RepeatWrapping;
floor.material.aoMap.wrapT = THREE.RepeatWrapping;
//floor.material.normalMap.wrapT = THREE.RepeatWrapping;
floor.material.roughnessMap.wrapT = THREE.RepeatWrapping;

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0


floor.receiveShadow = true;


export default floor;