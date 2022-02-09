import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 110), 0.1, 1000);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });



const cube = new THREE.Mesh(geometry, material);



let renderer;
let constrols;

scene.add(cube);
camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    renderer.render(scene, camera);
};


const resize = () => {
    renderer.setSize(window.innerWidth, (window.innerHeight - 110));
    camera.aspect = window.innerWidth / (window.innerHeight - 110);
    camera.updateProjectionMatrix();
};


export const createScene = (el) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    constrols = new OrbitControls(camera, el);
    resize();
    animate();
    console.log("createScene");
}


window.addEventListener('resize', resize);