import * as THREE from 'three';

const parameters = { count: 1000, size: 0.02, radius: 5, branches: 3, spin: 1 };
let selfGui = null;
let selfScene = null;

const geometry = new THREE.BufferGeometry();
const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
let points = null;




function galaxyBigBang(scene, gui) {

    if (scene && gui) {
        selfScene = scene;
        selfGui = gui;
        setGui();
    }

    const positions = new Float32Array(parameters.count * 3);
    if (points !== null) {
        geometry.dispose();
        material.dispose();
        if (selfScene !== null) {
            selfScene.remove(points)
        }
    }

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
        const spinAngle = radius * parameters.spin;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

    }
    points = new THREE.Points(geometry, material);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    if (selfScene) {
        selfScene.add(points);
    }
}


function setGui() {

    if (selfGui && selfScene) {
        selfGui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(galaxyBigBang)
        selfGui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(galaxyBigBang);
    }
}


export { parameters, galaxyBigBang };