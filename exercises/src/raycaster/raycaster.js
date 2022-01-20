import * as THREE from 'three';

const parameters = { radius: 0.5, widthSegments: 32, heightSegments: 6, wireframe: false, baseColor: new THREE.Color('#ff0000'), clickColor: new THREE.Color('#ffb606') };
const raycasterGroup = new THREE.Group();

const geometry = new THREE.SphereGeometry(parameters.radius, parameters.widthSegments, parameters.heightSegments);

const mesh1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: parameters.baseColor, wireframe: parameters.wireframe }));
const mesh2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: parameters.baseColor, wireframe: parameters.wireframe }));
const mesh3 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: parameters.baseColor, wireframe: parameters.wireframe }));
raycasterGroup.add(mesh1, mesh2, mesh3);

mesh1.position.x = -2;
mesh3.position.x = 2;

const sizes = {
    width: window.innerWidth,
    heigth: window.innerHeight
};

let currentIntersect = null;
const raycaster = new THREE.Raycaster();
const raycasterOrigin = new THREE.Vector3(-3, 0, 0);
const raycasterDirection = new THREE.Vector3(10, 0, 0);
raycasterDirection.normalize();

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (ev) => {
    mouse.x = ev.clientX / sizes.width * 2 - 1;
    mouse.y = -(ev.clientY / sizes.heigth) * 2 + 1;
});

window.addEventListener('click', () => {
    if (currentIntersect) {
        switch (currentIntersect.object) {
            case mesh1:
                if (mesh1.material.color.getHexString() === parameters.clickColor.getHexString()) {
                    mesh1.material.color = parameters.baseColor;
                } else {
                    mesh1.material.color = parameters.clickColor;
                }
                break;
            case mesh2:
                if (mesh2.material.color.getHexString() === parameters.clickColor.getHexString()) {
                    mesh2.material.color = parameters.baseColor;
                } else {
                    mesh2.material.color = parameters.clickColor;
                }
                break;
            case mesh3:
                if (mesh3.material.color.getHexString() === parameters.clickColor.getHexString()) {
                    mesh3.material.color = parameters.baseColor;
                } else {
                    mesh3.material.color = parameters.clickColor;
                }
                break;
        }
    }
});

function init(scene, gui) {
    scene.add(raycasterGroup);
    gui.add(parameters, 'widthSegments').min(5).max(100).step(0.001);
    gui.add(parameters, 'wireframe');
}


function insideAnimation(clock, camera) {
    const elapsedTime = clock.getElapsedTime();

    mesh1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    mesh2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    mesh3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

    raycaster.setFromCamera(mouse, camera);


    //raycaster.set(raycasterOrigin, raycasterDirection);

    const objectsToTest = raycasterGroup.children;
    const intersects = raycaster.intersectObjects(objectsToTest);
    //console.log(intersects);
    //console.log(currentIntersect);

    if (intersects.length) {
        if (!currentIntersect) {

        }
        currentIntersect = intersects[0];
        //currentIntersect.object.material.color.set('#ffb606');
    } else {
        if (currentIntersect) {
            //currentIntersect.object.material.color.set('red');
        }

        currentIntersect = null;
    }

}

export default init;
export { parameters, insideAnimation };

