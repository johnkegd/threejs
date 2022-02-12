import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

let renderer, controls, windowSizes;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
camera.position.z = 6;
scene.add(camera);


const settings = {
    materialColor: "#ff0000",
};


const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: settings.materialColor })
);
scene.add(cube);


function updateCameraAspect() {
    camera.aspect = windowSizes.width / windowSizes.height;
    camera.updateProjectionMatrix();
}

function initGui(guiContainer) {
    if (guiContainer) {
        const gui = new GUI({ container: guiContainer });
        gui.addColor(settings, "materialColor").onChange(() => {
            cube.material.color.set(settings.materialColor);
        });
    }
}


const animation = () => {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
};

export const createScene = (canvas, guiContainer, sizes) => {
    windowSizes = sizes;

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });
    renderer.setSize(sizes.width, sizes.height);

    initGui(guiContainer);
    updateCameraAspect();

    animation();
}