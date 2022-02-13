import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

let renderer, controls, windowSizes;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
camera.position.z = 6;
//adding camera
scene.add(camera);


const settings = {
    color: "#ffeded",
    distanceBetween: 4,
    scrollY: 0,
};

const material = new THREE.MeshToonMaterial({ color: settings.color });

const geometriesGroup = new THREE.Group();
//adding group
scene.add(geometriesGroup);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material,
);


const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material,
);

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material,
);
torus.position.y = - settings.distanceBetween * 0;
cone.position.y = - settings.distanceBetween * 1;
torusKnot.position.y = - settings.distanceBetween * 2;

// adding meshes to geometriesGroup
geometriesGroup.add(torus, cone, torusKnot);


const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
//adding light
scene.add(directionalLight);



function initGui(guiContainer) {
    if (guiContainer) {
        const gui = new GUI({ container: guiContainer });
        gui.addColor(settings, "color").onChange(() => {
            material.color.set(settings.color);
        });
    }
}


const clock = new THREE.Clock();

const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    camera.position.y = - settings.scrollY / windowSizes.height * settings.distanceBetween;

    for (const mesh of geometriesGroup.children) {
        mesh.rotation.x = elapsedTime * 0.1;
        mesh.rotation.y = elapsedTime * 0.12;
    }

    requestAnimationFrame(animation);
    renderer.render(scene, camera);
};


export const windowResize = (ev) => {
    if (ev && ev.currentTarget) {
        windowSizes = { width: ev.currentTarget.innerWidth, height: ev.currentTarget.innerHeight };
    }

    renderer.setSize(windowSizes.width, windowSizes.height);
    camera.aspect = windowSizes.width / windowSizes.height;
    camera.updateProjectionMatrix();
}

export const scrollUpdate = () => {
    settings.scrollY = window.scrollY;
}

export const createScene = (canvas, guiContainer, sizes) => {
    windowSizes = sizes;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });

    console.log(geometriesGroup);

    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load('/textures/demos/scroll/gradients/5.jpg');
    gradientTexture.magFilter = THREE.NearestFilter;
    material.gradientMap = gradientTexture;

    windowResize();
    initGui(guiContainer);
    animation();
}
