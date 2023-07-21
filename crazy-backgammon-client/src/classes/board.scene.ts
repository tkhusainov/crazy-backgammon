import {find} from 'lodash';
import * as THREE from 'three';

export class Chip extends THREE.Mesh {
    private static defaultColor = new THREE.Color('red').convertSRGBToLinear();
    private static hoverColor = new THREE.Color('blue').convertSRGBToLinear();

    isSelected: boolean;

    constructor() {
        super();
        const radius = 5;
        const height = 2;
        const radialSegments = 12;
        this.geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments);
        this.material = new THREE.MeshStandardMaterial({color: Chip.defaultColor});
        this.rotateX(Math.PI/4);
        this.isSelected = false;
    }

    render() {
        this.rotateY(0.05);
        this.rotateX(0.01);
    }

    onMouseIn() {
        (this.material as THREE.MeshStandardMaterial).color = Chip.hoverColor;
    }

    onMouseOut() {
        (this.material as THREE.MeshStandardMaterial).color = Chip.defaultColor;
    }

    onClick() {
        this.isSelected = !this.isSelected;
        if (this.isSelected) {
            this.scale.setScalar(1.5);
        } else {
            this.scale.setScalar(1);
        }
    }
}

export class BoardScene {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private container: HTMLElement;
    private renderer: THREE.Renderer;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private containerSize: {
        width: number;
        height: number;
    };
    private hoveredChip = null;
    private selectedChip = null;
    private intersects = [];

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
        const chip = new Chip();
        this.scene.add(chip);

        this.camera = new THREE.PerspectiveCamera(75, this.containerSize.width / this.containerSize.height, 0.1, 1000);
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.containerSize.width, this.containerSize.height);

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('pointermove', (e) => {
            const x = ((e.clientX - this.container.offsetLeft) / this.containerSize.width) * 2 - 1;
            const y = ((e.clientY - this.container.offsetTop) / this.containerSize.width) * 2 - 1;
            this.mouse.set(x, -y);
            this.raycaster.setFromCamera(this.mouse, this.camera);

            this.intersects = this.raycaster.intersectObjects(this.scene.children, true);
            this.updatedSelectedChip();
        });

        window.addEventListener('click', () => {
            if (this.hoveredChip) {
                this.hoveredChip.onClick();
                this.selectedChip = this.hoveredChip;
            }
        });
    }

    private updatedSelectedChip() {
        const chip = find(this.intersects, (intersect) => intersect.object instanceof Chip)?.object;

        if (chip) {
            if (chip.id !== this.hoveredChip?.id) {
                this.hoveredChip = chip;
                this.hoveredChip.onMouseIn();
            }
        } else if (this.hoveredChip) {
            this.hoveredChip.onMouseOut();
            this.hoveredChip = null;
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.scene.traverse((obj: any) => {
            if (obj.render) obj.render();
        });
        this.renderer.render(this.scene, this.camera);
    }

    addObject(child: THREE.Object3D) {
        this.scene.add(child);
    }
}