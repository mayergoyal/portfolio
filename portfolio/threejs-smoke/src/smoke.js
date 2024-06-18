import * as THREE from 'three';

class Smoke {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];

        const smokeTexture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/smoke.png');
        const smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, map: smokeTexture, transparent: true });
        const smokeGeo = new THREE.PlaneGeometry(300, 300);

        for (let p = 0; p < 150; p++) {
            let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
            particle.position.set(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 1000);
            particle.rotation.z = Math.random() * 360;
            this.scene.add(particle);
            this.particles.push(particle);
        }
    }

    animate() {
        this.particles.forEach(particle => {
            particle.rotation.z += 0.01;
        });
    }
}

export { Smoke };
