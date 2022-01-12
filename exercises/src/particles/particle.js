import * as THREE from 'three';

const particlesGeometry = new THREE.BufferGeometry();
const count = 500;

const positions = new Float32Array(count * 3);

for(let i = 0; i< count; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3));


const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
});
particlesMaterial.size = 0.1;
const particles = new THREE.Points(particlesGeometry, particlesMaterial);


export default particles;