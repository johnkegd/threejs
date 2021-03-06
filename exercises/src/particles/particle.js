import * as THREE from 'three';

const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/9.png');

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
});

//particlesMaterial.map = particleTexture;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture
particlesMaterial.size = 0.1;
particlesMaterial.vertexColors = true;

particlesMaterial.color = new THREE.Color('#ffb606');
//particlesMaterial.alphaTest = 0.001;
//particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;


const particles = new THREE.Points(particlesGeometry, particlesMaterial);


export default particles;