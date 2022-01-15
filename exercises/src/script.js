import './style.css'
import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { parameters, galaxyBigBang } from './galaxy/galaxy';
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
camera.position.z = 2;

const axesHelper = new THREE.AxesHelper(8);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// init galaxy generator
galaxyBigBang(scene, gui);


scene.add(camera);


const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('resize', function () {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = window.innerWidth / window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);
});



function animation() {
    window.requestAnimationFrame(animation);
    renderer.render(scene, camera);
    controls.update();
}

animation();