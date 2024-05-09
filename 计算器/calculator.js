let scene, camera, renderer, cube;

function init3D() {
    // 创建场景
    scene = new THREE.Scene();

    // 设置摄像机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器并将其绑定到HTML中的元素
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight); // 假设你想让渲染器填满一半的屏幕宽度
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // 创建一个几何体（方块），并将其大小设置为1x1x1
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 添加光源
    const light = new THREE.PointLight(0xffffff, 1.5, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    // 开始渲染动画
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    // 每帧旋转方块
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // 渲染场景和摄像机
    renderer.render(scene, camera);
}

window.onload = init3D;
