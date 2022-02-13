import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

let renderer, controls, windowSizes;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const cubeSettings = {
    color: '#ffb000',
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 8,
    heightSegments: 8,
    wireframe: true,
};

const geometry = new THREE.BoxGeometry(cubeSettings.width, cubeSettings.height, cubeSettings.depth, cubeSettings.widthSegments, cubeSettings.heightSegments);
const material = new THREE.MeshBasicMaterial({ color: cubeSettings.color, wireframe: cubeSettings.wireframe });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



const clock = new THREE.Clock();

const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    cube.rotation.x = elapsedTime * 0.5;
    cube.rotation.y = elapsedTime * 0.02;
    renderer.render(scene, camera);
};


function updateCameraAspect() {
    camera.aspect = windowSizes.width / windowSizes.height;
    camera.updateProjectionMatrix();
}

function initGui(guiContainer) {

    if (guiContainer) {
        const gui = new GUI({ container: guiContainer });
        gui.addColor(cubeSettings, 'color').onChange(() => {
            material.color.set(cubeSettings.color);
        });

        const dimensionFolder = gui.addFolder('Cube Dimensions');

        dimensionFolder.add(cubeSettings, 'width').min(1).max(6).step(0.0001);
        dimensionFolder.add(cubeSettings, 'height').min(1).max(6).step(0.0001);
        dimensionFolder.add(cubeSettings, 'depth').min(1).max(6).step(0.0001);
        dimensionFolder.onChange(() => {
            cube.scale.set(cubeSettings.width, cubeSettings.height, cubeSettings.depth);
        })
    }
}




export const cameraUpdater = (ev) => {
    if (ev && ev.currentTarget) {
        windowSizes = { width: ev.currentTarget.innerWidth, height: ev.currentTarget.innerHeight };
    }

    renderer.setSize(windowSizes.width, windowSizes.height);
    camera.aspect = windowSizes.width / windowSizes.height;
    camera.updateProjectionMatrix();
}



export const createScene = (el, guiContainer, sizes) => {
    windowSizes = sizes;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });

    controls = new OrbitControls(camera, el);

    console.log(window);

    cameraUpdater();
    initGui(guiContainer);

    animate();
}