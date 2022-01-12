import * as THREE from 'three';
import textureMapper from '../utils/textureMapper';

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

export default walls;