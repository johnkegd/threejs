import * as THREE from 'three';

const parameters = { radius: 0.5, widthSegments: 32, heightSegments: 6 };
const raycasterGroup = new THREE.Group();

const geometry = new THREE.SphereGeometry(parameters.radius, parameters.widthSegments, parameters.heightSegments);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
const mesh3 = new THREE.Mesh(geometry, material);
raycasterGroup.add(mesh1, mesh2, mesh3);

mesh1.position.x = -2;
mesh3.position.x = 2;




const raycaster = new THREE.Raycaster();

const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();

raycaster(rayOrigin, rayDirection);



function init(scene, gui) {
    scene.add(raycasterGroup);
    gui.add(parameters, 'widthSegments').min(5).max(100).step(0.001);
}


export default init;
export { parameters };

