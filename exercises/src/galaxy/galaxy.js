import * as THREE from 'three';

const parameters = {
    count: 287200,
    size: 0.016,
    radius: 16.56,
    branches: 10,
    spin: 1.558,
    randomness: 1.238,
    randomnessPower: 4.801,
    insideColor: '#917546',
    outsideColor: '#1b3984',
};
let selfGui = null;
let selfScene = null;

const geometry = new THREE.BufferGeometry();
const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
});
let points = null;


function galaxyBigBang(scene, gui) {

    if (scene && gui) {
        selfScene = scene;
        selfGui = gui;
        setGui();
    }

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
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
        const spinAngle = radius * parameters.spin;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

    }
    points = new THREE.Points(geometry, material);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    if (selfScene) {
        selfScene.add(points);
    }
    return points;
}


function setGui() {

    if (selfGui && selfScene) {
        selfGui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(galaxyBigBang)
        selfGui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(galaxyBigBang);
        selfGui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(galaxyBigBang);
        selfGui.addColor(parameters, 'insideColor').onFinishChange(galaxyBigBang);
        selfGui.addColor(parameters, 'outsideColor').onFinishChange(galaxyBigBang);
    }
}


export { parameters, galaxyBigBang };