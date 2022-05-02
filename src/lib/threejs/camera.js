import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const scene = new THREE.Scene();
let renderer, sizes = { width: 0, height: 0 }, camera;

const directionalLight = new THREE.DirectionalLight("#fff", 10);
directionalLight.position.y = 5;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight("#fff", 10);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshBasicMaterial({ color: "white" }));
scene.add(mesh);

function modelLoader() {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);
    loader.load("/models/gltf/camera-test.glb", (model) => {
        window.model = model;
        camera = model.cameras[0];
        /*       camera.aspect = sizes.width / sizes.height;
              camera.fov = 35;
              camera.near = 0.1; */

        console.log("model loadedd");
        const mixer = new THREE.AnimationMixer(camera);
        const action = mixer.clipAction(model.animations[0]);
        scene.add(model.scene);

        action.play();
        tick();
    });
}

function tick() {
    window.requestAnimationFrame(tick);

    if (camera)
        renderer.render(scene, camera);
    camera.updateProjectionMatrix();
}

export const resizeHandler = sizes => {
    if (camera) {
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
}


export default (canvas) => {
    sizes.width = canvas.width;
    sizes.height = canvas.height;
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);
    modelLoader();
    //tick();
}