import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const settings = {
    materialColor: "#ffb606",
};

let renderer, controls;




const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / (window.innerHeight - 110), 0.1, 1000);
camera.position.z = 6;
scene.add(camera);

const resize = () => {
    renderer.setSize(window.innerWidth, (window.innerHeight - 110));
    camera.aspect = window.innerWidth / (window.innerHeight - 110);
    camera.updateProjectionMatrix();
};

const animation = () => {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
};

export const createScene = (canvas, guiContainer) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });
    const gui = new GUI({ container: guiContainer });
    gui
        .addColor(settings, "materialColor");
    resize();
    animation();
}