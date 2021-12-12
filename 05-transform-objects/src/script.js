import './style.css'
import * as THREE from 'three'
import { CameraHelper, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'lil-gui';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const SIZES = {
    width: window.innerWidth,
    height: window.innerHeight,
};


//firstStep();
secondStep();





function firstStep() {
    // UI paramenters 
    const paramenters = {
        color: 0xffffff,
        skin: function () {
            gsap.to(boxMesh.rotation, { duration: 2, y: boxMesh.rotation.y + 10 })
        },
        alphaEnabled: true,
    };

    /**
     * Objects group
     * 
    */
    const geometriesGroup = new Group();



    /**
     * Textures loader
     */
    const manager = new THREE.LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    }

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    }

    manager.onError = function (url) { console.log('There was an error loading ' + url); }

    manager.onLoad = function () { console.log('Loading complete!'); }


    const textureloader = new THREE.TextureLoader(manager);
    const texture = textureloader.load('/textures/minecraft.png', function (texture) {
        console.log("texture loaded");
    }, undefined, function (err) {
        console.log("some error occured while  chargin texture: ", error);
    });
    const normalTexture = textureloader.load('/textures/door/normal.jpg');


    texture.rotation = Math.PI / 4;
    texture.center.x = 0.5;
    texture.center.y = 0.5;


    // when area is less
    texture.magFilter = THREE.NearestFilter;

    // when area is greater - when minFilter have nearestFilter, deactivate mipMaps to better performance
    texture.generateMipmaps = false;
    texture.minFilter = THREE.NearestFilter;


    /**
     * Object boxMesh
     */

    const boxMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: paramenters.color, map: texture }));
    //boxMesh.scale.z = 2;
    boxMesh.rotation.y = Math.PI / 1.25;
    geometriesGroup.add(boxMesh);




    /**
     * Object sphereMesh
     */
    const sphereMesh = new THREE.Mesh(
        getGeometry(),
        new THREE.MeshBasicMaterial({ color: paramenters.color }));
    sphereMesh.position.x = 1;
    sphereMesh.position.y = 3;
    //geometriesGroup.add(sphereMesh)

    geometriesGroup.position.x = 0;
    scene.add(geometriesGroup);



    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.x = 2.3;
    camera.position.y = 1;
    camera.position.z = 1;
    camera.lookAt(boxMesh.position);
    scene.add(camera);


    const controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.enableDamping = true;
    /**
     * Lights
     */
    const light = new THREE.Light(0xffffff, 2.0);
    light.position.x = 2;
    scene.add(light);


    /**
     * axesHelper
     */
    const axesHelper = new THREE.AxesHelper(8);
    scene.add(axesHelper);


    const gui = new dat.GUI();
    gui.add(boxMesh.position, 'y', -3, 3, 0.1).name("cube position Y");
    gui.add(boxMesh.material, 'wireframe').name("wireframe");
    gui.addColor(boxMesh.material, 'color').name('color');
    gui.add(paramenters, 'skin').name("skin");
    //gui.add(paramenters, 'alphaEnabled').name("alpha enabled");
    //gui.close();


    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: false
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clock
    //const clock = new THREE.Clock();

    // gsap.to(boxMesh.position, { duration: 1, delay: 1, x: 2 });
    // gsap.to(boxMesh.position, { duration: 1, delay: 2, x: 0 });


    window.addEventListener("resize", function () {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        // for window resize in multiple monitors
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener('dblclick', () => {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

        if (!fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                canvas.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    });


    function animation() {
        /*  requestAnimationFrame(animation);
         const elapsedTime = clock.getElapsedTime();
         boxMesh.position.x = Math.cos(elapsedTime);
         boxMesh.rotation.y = elapsedTime * Math.PI * 1;
         sphereMesh.rotation.x = elapsedTime * Math.PI * 2;
         sphereMesh.position.y = Math.sin(elapsedTime);
         sphereMesh.position.x = Math.cos(elapsedTime);
     
         camera.lookAt(sphereMesh.position); */
        //geometriesGroup.rotation.x += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(animation);
    }

    animation();






    function getGeometry() {
        const positions = new Float32Array(30 * 3 * 3);
        for (var i = 0; i < positions.length; i++) {
            positions[i] = Math.random() * (100 - -10) + -10;;
        }
        const customGeometry = new THREE.BufferGeometry();
        customGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return customGeometry;

    }
}



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


    const orbitControls = new OrbitControls(camera, canvas);
    orbitControls.enableDamping = true;
    orbitControls.enabled = true;


    const gui = new dat.GUI();
    gui.add(material, "metalness").min(0).max(1).step(0.0001);
    gui.add(material, "roughness").min(0).max(1).step(0.0001);
    gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
    gui.add(material, "displacementScale").min(0).max(10).step(0.0001);
    gui.add(material.normalScale, "x").min(0).max(100).step(0.0001);
    gui.add(material.normalScale, "y").min(0).max(100).step(0.0001);
    //gui.add(material, "wireframe").name("Global wireframe");
    //gui.addColor(material, "color").name("Global color");
    //gui.add(parameters.torus, "radius", 0.0, 100.00, 1).name("radius");

    const renderer = new THREE.WebGLRenderer({
        canvas
    });

    renderer.setSize(SIZES.width, SIZES.height);
    renderer.render(scene, camera);

    function animation() {
        requestAnimationFrame(animation);
        renderer.render(scene, camera);
    }

    animation();

}