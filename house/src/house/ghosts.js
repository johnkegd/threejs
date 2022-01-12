import * as THREE from 'three';

const ghost1 = new THREE.PointLight('#FFFF00', 2, 3);
const ghost2 = new THREE.PointLight('#FFFF00', 2, 3);
const ghost3 = new THREE.PointLight('#FFFF00', 2, 3);

ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;


ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 15;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 15;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 15;

export default [ghost1, ghost2, ghost3];