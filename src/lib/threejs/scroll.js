import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

let renderer, controls, windowSizes;

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
camera.position.z = 6;
//adding camera
scene.add(camera);


const settings = {
    globalColor: "#ffeded",
    distanceBetween: 4,
    scrollY: 0,
};

const torusSettings = {
    color: "#ffeded",
    radius: 1,
    tube: 0.4,
    radialSegments: 16,
    tubularSegments: 60,
};


/***
 * init objects, geometries, materials
 */
const material = new THREE.MeshToonMaterial({ color: settings.globalColor });

const geometriesGroup = new THREE.Group();
//adding group for meshes
scene.add(geometriesGroup);

const torusGeometry = new THREE.TorusGeometry(
    torusSettings.radius,
    torusSettings.tube,
    torusSettings.radialSegments,
    torusSettings.tubularSegments);
const torus = new THREE.Mesh(torusGeometry, material);

const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32),
    material,
);
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material,
);
torus.position.y = -settings.distanceBetween * 0;
cone.position.y = -settings.distanceBetween * 1;
torusKnot.position.y = -settings.distanceBetween * 2;

// adding meshes to geometriesGroup
geometriesGroup.add(torus, cone, torusKnot);



const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
//adding light
scene.add(directionalLight);


function generateGeometry(mesh, geometry) {
    mesh.geometry.dispose();
    mesh.geometry = geometry;
}




function initGui(guiContainer) {
    if (guiContainer) {
        const gui = new GUI({ container: guiContainer });
        gui.addColor(settings, "globalColor").onChange(() => {
            console.log("globalColor change");
            material.color.set(settings.globalColor);
        });

        const geometriesFolder = gui.addFolder('Geometries');
        const torusFolder = geometriesFolder.addFolder('Torus');

        torusFolder.add(torusSettings, 'radius').min(0.001).max(10).step(0.001).onChange(() => {
            const geometry = new THREE.TorusGeometry(
                torusSettings.radius,
                torusSettings.tube,
                torusSettings.radialSegments,
                torusSettings.tubularSegments,
            );
            generateGeometry(torus, geometry);
        });

    }
}



const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    camera.position.y = -settings.scrollY / windowSizes.height * settings.distanceBetween;

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
