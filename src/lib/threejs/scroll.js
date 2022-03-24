import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { addDefaultGeometryGui } from '$lib/threejs/utils/geometry-browser.js';
import { ParametricGeometry } from 'three';

let renderer, controls, windowSizes, previousTime = 0;

const scene = new THREE.Scene();
const clock = new THREE.Clock();

/**
 * Cameras
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup)
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
camera.position.z = 6;
//adding camera
cameraGroup.add(camera);


const settings = {
    globalColor: "#921111",
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

const cursor = {
    x: 0,
    y: 0,
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

torus.position.x = 1;
cone.position.x = -1;
torusKnot.position.x = 1;

torus.position.y = -settings.distanceBetween * 0;
cone.position.y = -settings.distanceBetween * 1;
torusKnot.position.y = -settings.distanceBetween * 2;

// adding meshes to geometriesGroup
geometriesGroup.add(torus, cone, torusKnot);



const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
//adding light
scene.add(directionalLight);

function initGui(guiContainer) {
    if (guiContainer) {
        const gui = new GUI({ container: guiContainer });
        gui.addColor(settings, "globalColor").onChange(() => {
            console.log("globalColor change");
            material.color.set(settings.globalColor);
        });

        const geometriesFolder = gui.addFolder('Geometries');

        const torusFolder = geometriesFolder.addFolder('Torus');

        const coneFolder = geometriesFolder.addFolder('Cone');
        coneFolder.close();

        const torusKnotFolder = geometriesFolder.addFolder('TorusKnout');
        torusKnotFolder.close();

        addDefaultGeometryGui(torus, torusFolder);
        addDefaultGeometryGui(cone, coneFolder);
        addDefaultGeometryGui(torusKnot, torusKnotFolder);


        // by one
        /* torusFolder.add(torusSettings, 'radius').min(0.001).max(10).step(0.001).onChange(() => {
            meshGeometryUpdater(torus, torusSettings);
        }); */

    }
}

/**
 * Particles
 */
function addParticles() {
    const particlesCount = 600;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = settings.distanceBetween * 0.5 - Math.random() * settings.distanceBetween * geometriesGroup.children.length;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: settings.globalColor,
        sizeAttenuation: true,
        size: 0.03,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

}



const animation = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    camera.position.y = -settings.scrollY / windowSizes.height * settings.distanceBetween;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;

    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

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

export const mouseMove = (ev) => {
    cursor.x = ev.clientX / windowSizes.width - 0.5;
    cursor.y = ev.clientY / windowSizes.height - 0.5;
    window.cursor = cursor;
}

export const scrollUpdate = () => {
    settings.scrollY = window.scrollY;
}

export const createScene = (canvas, guiContainer, sizes) => {
    windowSizes = sizes;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });


    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load('/textures/demos/scroll/gradients/3.jpg');
    gradientTexture.magFilter = THREE.NearestFilter;
    material.gradientMap = gradientTexture;

    windowResize();
    initGui(guiContainer);
    addParticles();
    animation();
}
