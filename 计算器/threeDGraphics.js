let scene, camera, renderer, cube;

function init3D() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-1, 2, 4);
    scene.add(pointLight);


    const geometry = new THREE.BoxGeometry(2,2,2);
    const material = new THREE.MeshPhongMaterial({color: 0x550c2b9d});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);



    renderer.shadowMap.enabled = true;
    pointLight.castShadow = true;
    cube.castShadow = true;
    cube.receiveShadow = true;
    

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    

    document.addEventListener('calculationCompleted', (e) => {
        const result = e.detail.result;
        cube.material.color.setHex(result % 2 === 0 ? 0x00ffaa : 0xff0000);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

window.onload = init3D;

