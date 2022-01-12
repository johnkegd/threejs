import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import resizeCanvas from '../utils/resizeCanvas';
import particles from './particle';

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: window.innerHeight,
    heigth: window.innerHeight
};

const gui = new dat.GUI();
console.log(particles.geometry);


const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.heigth);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//renderer.setClearColor('#323232');

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth);
camera.position.z = 5;
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;


const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial()
);
scene.add(cube);

scene.add(camera);
particles.geometry.center();
scene.add(particles);

resizeCanvas(renderer, camera);


function animation() {
    window.requestAnimationFrame(animation);
    renderer.render(scene, camera);
    orbitControls.update()
}


export default animation;