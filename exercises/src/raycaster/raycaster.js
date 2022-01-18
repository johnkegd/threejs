import * as THREE from 'three';


const raycasterGroup = new THREE.Group();

const geometry = new THREE.SphereGeometry(0.5, 32, 6);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
const mesh3 = new THREE.Mesh(geometry, material);
raycasterGroup.add(mesh1, mesh2, mesh3);

mesh1.position.x = -2;
mesh3.position.x = 2;




const raycaster = new THREE.Raycaster();


export default raycasterGroup;

