import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'

const doorTexturesPath = './textures/door/';
const wallsTexturesPath = './textures/bricks/';
const floorTexturesPath = '/textures/grass/';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * House
 */
// Temporary sphere
/* const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
sphere.position.y = 1 */
//scene.add(sphere)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)

floor.material.map = textureLoader.load(floorTexturesPath + 'color.jpg');
floor.material.aoMap = textureLoader.load(floorTexturesPath + 'ambientOcclusion.jpg');
floor.material.normalMap = textureLoader.load(floorTexturesPath + 'normal.jpg');
floor.material.roughnessMap = textureLoader.load(floorTexturesPath + 'roughness.jpg');
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));

floor.material.map.repeat.set(8, 8);
floor.material.aoMap.repeat.set(8, 8);
floor.material.normalMap.repeat.set(8, 8);
floor.material.roughnessMap.repeat.set(8, 8);

floor.material.map.wrapS = THREE.RepeatWrapping;
floor.material.aoMap.wrapS = THREE.RepeatWrapping;
floor.material.normalMap.wrapS = THREE.RepeatWrapping;
floor.material.roughnessMap.wrapS = THREE.RepeatWrapping;

floor.material.map.wrapT = THREE.RepeatWrapping;
floor.material.aoMap.wrapT = THREE.RepeatWrapping;
floor.material.normalMap.wrapT = THREE.RepeatWrapping;
floor.material.roughnessMap.wrapT = THREE.RepeatWrapping;

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


//house
const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 2),
    new THREE.MeshStandardMaterial()
);

walls.material.map = textureLoader.load(wallsTexturesPath + 'color.jpg');
walls.material.aoMap = textureLoader.load(wallsTexturesPath + 'ambientOcclusion.jpg');
walls.material.normalMap = textureLoader.load(wallsTexturesPath + 'normal.jpg');
walls.material.roughnessMap = textureLoader.load(wallsTexturesPath + 'roughness.jpg');

walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));

walls.position.y = 0.7;
house.add(walls);

const ceiling = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 2, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0xffb606 })
);
ceiling.position.y = 1.8;
ceiling.rotation.y = Math.PI / 4;

house.add(ceiling);

const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.2, 0.2, 0.2);
bush1.position.set(0.9, 0.1, 1.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.20, 0.20, 0.20);
bush2.position.set(-0.5, 0.03, 1.2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.10, 0.10, 0.10);
bush3.position.set(0.65, 0.04, 1.1);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.13, 0.15, 0.15);
bush4.position.set(-0.8, 0.05, 1.15);

house.add(bush1, bush2, bush3, bush4);


const door = new Mesh(
    new PlaneGeometry(0.9, 1),
    new MeshStandardMaterial({ color: 'orange' })
);
door.material.map = textureLoader.load(doorTexturesPath + 'color.jpg');
door.material.transparent = true;
door.material.alphaMap = textureLoader.load(doorTexturesPath + 'alpha.jpg');
door.material.aoMap = textureLoader.load(doorTexturesPath + 'ambientOcclusion.jpg');
door.material.metalnessMap = textureLoader.load(doorTexturesPath + 'metalness.jpg');
door.material.displacementMap = textureLoader.load(doorTexturesPath + 'height.jpg');
door.material.roughnessMap = textureLoader.load(doorTexturesPath + 'roughness.jpg');
door.material.normalMap = textureLoader.load(doorTexturesPath + 'normal.jpg');
door.material.displacementScale = 0.1;

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));

door.position.y = 0.45;
door.position.z = 1.001
house.add(door);


// Graves

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
    const angle = (Math.random() * Math.PI) * 2; // Random angle
    const radius = 3 + Math.random() * 6; // Random radius
    const x = Math.cos(angle) * radius; // Get the x position
    const z = Math.sin(angle) * radius; // Get the z position

    const grave = new Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.2, z);

    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;

    graves.add(grave);
}


// Fog
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;


// Ghosts
const ghost1 = new THREE.PointLight('#FFFF00', 2, 3);
const ghost2 = new THREE.PointLight('#FFFF00', 2, 3);
const ghost3 = new THREE.PointLight('#FFFF00', 2, 3);
scene.add(ghost1, ghost2, ghost3);


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 1.2, 1.5);

house.add(doorLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.shadowMap.enabled = true;
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;

// Optimizations
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 15;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 15;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 15;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 15;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(elapsedTime * 3);

    /*  const ghost2Angle = - elapsedTime * 0.32;
     ghost2.position.x = Math.cos(ghost2Angle) * 5;
     ghost2.position.y = Math.sin(ghost2Angle) * 5;
     ghost2.position.z = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
 
     const ghost3Angle = - elapsedTime * 0.18;
     ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
     ghost3.position.y = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
     ghost3.position.z = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5); */


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()