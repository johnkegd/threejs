import './style.css'
import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import raycasterInit from './raycaster/raycaster';
import { parameters } from './raycaster/raycaster';
//import { parameters, galaxyBigBang } from './galaxy/galaxy';
//import houseAnimation from './house/house';
//import particles from './particles/main';
//houseAnimation();
//particles();

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const gui = new dat.GUI();


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 2.5, 5);

const axesHelper = new THREE.AxesHelper(8);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

raycasterInit(scene, gui);
// init galaxy generator
//const points = galaxyBigBang(scene, gui);


scene.add(camera, axesHelper);


const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('resize', function () {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = window.innerWidth / window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);
});


const clock = new THREE.Clock();


function animation() {
    const elapsedTime = clock.getElapsedTime();
    //camera.position.x += 0.001;
    //console.log(camera.position.x);
    //camera.rotateY(elapsedTime)
    //points.rotateY(0.00001);

    /*  camera.position.y = Math.sin(elapsedTime / 10);
     camera.position.z = Math.sin(elapsedTime / 100) * 30; */

    window.requestAnimationFrame(animation);
    renderer.render(scene, camera);
    controls.update();
}

animation();