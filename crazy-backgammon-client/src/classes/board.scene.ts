import {forEach} from 'lodash';
import * as THREE from 'three';

export class Chip extends THREE.Mesh {
    constructor() {
        super();
        const radius = 5;
        const height = 2;
        const radialSegments = 12;
        this.geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments);
        this.material = new THREE.MeshStandardMaterial({color: new THREE.Color('red').convertSRGBToLinear()});
        this.rotateX(Math.PI/4);
    }

    render() {
        // TODO: this method is never called but it is expected
        this.rotateY(0.1);
        // this.rotation.y += 0.01;
        // this.rotation.z += 0.01;
    }
}

export class BoardScene {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private container: HTMLElement;
    private renderer: THREE.Renderer;
    private containerSize: {
        width: number;
        height: number;
    };

    constructor(container: HTMLElement) {
        this.container = container;
        this.containerSize = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
    }

    initialize() {
        this.scene = new THREE.Scene();
        const bgColor = new THREE.Color(0xD2B48C);
        this.scene.background = bgColor;
        const light = new THREE.HemisphereLight(0x404040, 0xFFFFFF, 1.5);
        this.scene.add(light);
        this.scene.add(new Chip());

        this.camera = new THREE.PerspectiveCamera(75, this.containerSize.width / this.containerSize.height, 0.1, 1000);
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.containerSize.width, this.containerSize.height);

        this.container.appendChild(this.renderer.domElement);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        // TODO: For some reason render is not called from extended class
        // TODO: use Chip.render instead
        forEach(this.scene.children, (child) => {
            if (child instanceof Chip) {
                child.rotateX(0.01);
                child.rotateY(0.01);
                child.rotateZ(0.01);
            }
        });
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    addObject(child: THREE.Object3D) {
        this.scene.add(child);
    }
}