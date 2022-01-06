import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
//import firstStep from './lights';
import gsap from 'gsap';
import * as dat from 'lil-gui';
import { Mesh, MeshMatcapMaterial, RGBA_ASTC_5x4_Format, TextureLoader } from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const gui = new dat.GUI();

const SIZES = {
    width: window.innerWidth,
    height: window.innerHeight,
};


//firstStep();
//secondStep();

// lesson 13 TEXT 3d
text3D();






function secondStep() {

    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    const parameters = {
        torus: {
            radius: 0.3,
            rube: 0.2,
            radialSegments: 64,
            tubularSegments: 128,
            arc: Math.PI * 2
        },
        color: 0xfafafa
    }



    /***
     * Lights
     * 
     */
    const ambientLight = new THREE.AmbientLight(parameters.color, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(parameters.color, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);


    const texture = textureLoader.load("./textures/door/color.jpg");
    const normalTexture = textureLoader.load("./textures/door/normal.jpg");
    const alphaTexture = textureLoader.load("./textures/door/alpha.jpg");
    const matCapTexture = textureLoader.load("./textures/matcaps/8.png");
    const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");
    const ambientOcclussionTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg");
    const hightTexture = textureLoader.load("./textures/door/height.jpg");
    const metalTexture = textureLoader.load("./textures/door/metalness.jpg");
    const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");

    const enviromentMapTexture = cubeTextureLoader.load([
        "./textures/environmentMaps/4/px.png",
        "./textures/environmentMaps/4/nx.png",
        "./textures/environmentMaps/4/py.png",
        "./textures/environmentMaps/4/ny.png",
        "./textures/environmentMaps/4/pz.png",
        "./textures/environmentMaps/4/nz.png"
    ]);


    gradientTexture.minFilter = THREE.NearestFilter;
    gradientTexture.magFilter = THREE.NearestFilter;
    gradientTexture.generateMipmaps = false;


    const material = new THREE.MeshStandardMaterial();
    //material.matcap = matCapTexture;
    material.color = new THREE.Color(parameters.color);
    //material.gradientMap = gradientTexture;
    //material.transparent = true;
    //material.opacity = 0.5;
    //material.alphaMap = alphaTexture;

    material.roughness = 0.2;
    material.metalness = 0.7;
    /*
    material.map = texture;
    material.aoMap = ambientOcclussionTexture;
    material.aoMapIntensity = 1.5;
    material.normalMap = normalTexture;
    material.displacementMap = hightTexture;
    material.displacementScale = 0.01;
    material.metalnessMap = metalTexture;
    material.roughnessMap = roughnessTexture;
    material.transparent = true;
    material.alphaMap = alphaTexture;
    material.normalScale.set(0.5, 0.5);
*/
    material.envMap = enviromentMapTexture;




    // used for debug to see more vector details
    //const normalMaterial = new THREE.MeshNormalMaterial();
    //normalMaterial.flatShading = true;




    const geometriesGroup = new Group();

    const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
    const torusGeometry = new THREE.TorusGeometry(
        parameters.torus.radius,
        parameters.torus.rube,
        parameters.torus.radialSegments,
        parameters.torus.tubularSegments);



    const sphere = new THREE.Mesh(sphereGeometry, material),
        plane = new THREE.Mesh(planeGeometry, material),
        torus = new THREE.Mesh(torusGeometry, material);



    //plane.position.x = 2;
    torus.position.x = -2;


    plane.geometry.setAttribute("uv2", new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));

    plane.material.side = THREE.DoubleSide;



    sphere.position.x = 1.2

    geometriesGroup.add(sphere);
    geometriesGroup.add(plane);
    //geometriesGroup.add(torus);

    scene.add(geometriesGroup);

    const camera = new THREE.PerspectiveCamera(10, SIZES.width / SIZES.height);
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 5;
    scene.add(camera);


    gui.add(material, "metalness").min(0).max(1).step(0.0001);
    gui.add(material, "roughness").min(0).max(1).step(0.0001);
    gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
    gui.add(material, "displacementScale").min(0).max(10).step(0.0001);
    gui.add(material.normalScale, "x").min(0).max(100).step(0.0001);
    gui.add(material.normalScale, "y").min(0).max(100).step(0.0001);
    //gui.add(material, "wireframe").name("Global wireframe");
    //gui.addColor(material, "color").name("Global color");
    //gui.add(parameters.torus, "radius", 0.0, 100.00, 1).name("radius");

    render(scene, camera);

}

function text3D() {

    const textureFontLoader = new FontLoader();
    const textureLoader = new TextureLoader();
    const camera = new THREE.PerspectiveCamera(65, SIZES.width / SIZES.height);
    const mapcatTexture = textureLoader.load("/textures/matcaps/8.png");
    const secondMapCatTexture = textureLoader.load("/textures/matcaps/5.png");
    const material = new THREE.MeshMatcapMaterial({ color: 0xffffff });
    const materialAmor = new MeshMatcapMaterial();
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.3, 16, 65);
    gui.addColor(material, "color");
    material.matcap = mapcatTexture;
    materialAmor.matcap = secondMapCatTexture;
    const parameters = {
        size: 0.5
    }

    textureFontLoader.load('/fonts/helvetiker_regular.typeface.json',
        function (font) {
            const textGeometry = new TextGeometry(
                "Gwendolin Anna", {
                font: font,
                size: parameters.size,
                height: 0.2,
                curveSegments: 0.2,
                bevelEnabled: 5,
                bevelThickness: 0.03,
                bevelEnabled: true,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
            );

            const textLoveGeometry = new TextGeometry("Te Amo", {
                font: font,
                size: 2.5,
                height: 0.2,
                curveSegments: 0.2,
                bevelEnabled: 5,
                bevelThickness: 0.03,
                bevelEnabled: true,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            });

            const muchoGeometry = new TextGeometry("Mucho", {
                font: font,
                size: 3.5,
                height: 0.2,
                curveSegments: 0.2,
                bevelEnabled: 5,
                bevelThickness: 0.03,
                bevelEnabled: true,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            });
            //gui.add(parameters, "size").min(0.1).max(20).step(0.0001).name("Text size");
            const text = new Mesh(textGeometry, material);

            const textLove = new Mesh(textLoveGeometry, materialAmor);
            const mucho = new Mesh(muchoGeometry, materialAmor);


            textLove.position.y = 15;
            textLove.position.z = -15;
            textLove.rotation.x = 0.5;

            mucho.position.y = -15;
            mucho.position.z = -15;
            mucho.rotation.x = 0.05;

            textGeometry.center();
            textLoveGeometry.center();
            muchoGeometry.center();

            scene.add(text);
            scene.add(textLove);
            scene.add(mucho);
            scene.add(camera);

            for (var i = 0; i < 400; i++) {
                const donut = new Mesh(torusGeometry, material);
                donut.position.set(randomNum(-10, 15), randomNum(-15, 18), randomNum(-15, 12));
                donut.rotation.x = Math.PI * Math.random() * 0.5;
                donut.rotation.y = Math.PI * Math.random() * 0.8;
                scene.add(donut);
            }

            render(scene, camera);
        },
        null,
        function (err) {
            console.log("Error loading font: ", err);
        }
    );

    //gui.add(material, "wireframe").name("Text wireframe");
    camera.position.z = 7;
    //render(scene, camera);

}

function render(scene, camera) {
    const orbitControls = new OrbitControls(camera, canvas);
    orbitControls.enableDamping = true;
    orbitControls.enabled = true;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(SIZES.width, SIZES.height);
    renderer.render(scene, camera);

    function animation() {
        requestAnimationFrame(animation);
        renderer.render(scene, camera);
    }

    animation();
}

function randomNum(max, min) {
    return Math.random() * (max - min + 1) + min;
}