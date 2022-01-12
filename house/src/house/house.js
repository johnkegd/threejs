import * as THREE from 'three';
import * as dat from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import walls from './walls';
import floor from './floor';
import door from './door';
import roof from './roof';
import bashes from './bashes';
import ghosts from './ghosts';
import graves from './graves';
import lights from './lights';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const gui = new dat.GUI()


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.shadowMap.enabled = true;




const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;



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
});


const house = new THREE.Group();

scene.add(house, floor, camera, graves);

house.add(walls, door, roof);

bashes.forEach(bashe => {
    house.add(bashe);
});

ghosts.forEach(ghost => {
    scene.add(ghost);
});


lights.forEach(light => {
    // if doorLight add to the house
    scene.add(light);
});



const clock = new THREE.Clock()

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    const ghost1Angle = elapsedTime * 0.5;
    /*     ghost1.position.x = Math.cos(ghost1Angle) * 4;
        ghost1.position.y = Math.sin(ghost1Angle) * 4;
        ghost1.position.z = Math.sin(elapsedTime * 3); */

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
    window.requestAnimationFrame(animate)
}

export default animate;
