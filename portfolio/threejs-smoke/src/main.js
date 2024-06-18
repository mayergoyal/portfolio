import * as THREE from 'three';
import { Smoke } from './smoke.js';

let scene, camera, renderer;
let smokeParticles = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let smokeTexture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/smoke.png');
    let smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, map: smokeTexture, transparent: true });
    let smokeGeo = new THREE.PlaneGeometry(300, 300);

    for (let p = 0; p < 150; p++) {
        let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 1000);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

    let light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(-1, 0, 1);
    scene.add(light);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    smokeParticles.forEach(particle => {
        particle.rotation.z += 0.01;
    });
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
