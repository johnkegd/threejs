import './style.css'
import * as THREE from 'three'
import { Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();


/**
 * Objects group
 * 
*/
const geometriesGroup = new Group();


/**
 * Objects boxMesh
 */
const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }));
boxMesh.scale.z = 2;
boxMesh.rotation.y = Math.PI / 1.25;
geometriesGroup.add(boxMesh);

/**
 * Objects sphereMesh
 */
const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xffb606, wireframe: true }));
sphereMesh.position.x = 3;
geometriesGroup.add(sphereMesh)

geometriesGroup.position.x = 1;
scene.add(geometriesGroup);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 0.3;
camera.position.y = 2;
camera.position.z = 10;
camera.lookAt(boxMesh.position);
scene.add(camera);


const controls = new OrbitControls(camera, canvas);
controls.enabled = true;
controls.enableDamping = true;
/**
 * Lights
 */
const light = new THREE.Light(0xffffff, 2.0);
light.position.x = 2;
scene.add(light);


/**
 * axesHelper
 */
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


// Clock
//const clock = new THREE.Clock();

gsap.to(boxMesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(boxMesh.position, { duration: 1, delay: 2, x: 0 });


window.addEventListener("resize", function () {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});


function animation() {
    /*  requestAnimationFrame(animation);
     const elapsedTime = clock.getElapsedTime();
     boxMesh.position.x = Math.cos(elapsedTime);
     boxMesh.rotation.y = elapsedTime * Math.PI * 1;
     sphereMesh.rotation.x = elapsedTime * Math.PI * 2;
     sphereMesh.position.y = Math.sin(elapsedTime);
     sphereMesh.position.x = Math.cos(elapsedTime);
 
     camera.lookAt(sphereMesh.position); */
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}

animation();





