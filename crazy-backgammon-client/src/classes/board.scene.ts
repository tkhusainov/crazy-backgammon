import {find, forEach, isNumber} from 'lodash';
import * as THREE from 'three';

import {ChipColor} from 'enums';
import {GameChip} from 'types';

const blackColor = new THREE.Color('black').convertSRGBToLinear();
const whiteColor = new THREE.Color('white').convertSRGBToLinear();

const FOV = 75;
const CAMERA_Z = 15;

export class Chip extends THREE.Mesh {
    gameChipId: string;
    private static defaultColor = new THREE.Color('red').convertSRGBToLinear();
    private static hoverColor = new THREE.Color('blue').convertSRGBToLinear();

    isSelected: boolean;

    constructor({position, color, id, radius}) {
        super();
        this.gameChipId = id;
        const height = radius / 2;
        const radialSegments = 12;
        this.geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments);
        this.material = new THREE.MeshStandardMaterial({color});
        // this.rotateX(Math.PI/4);

        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = 0;
        this.isSelected = false;
        this.rotateX(Math.PI/2);
    }

    render() {
        // this.rotateY(0.05);
        // this.rotateX(0.01);
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
    private chips = [];
    private level = {};
    private viewportSize: {
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

        this.camera = new THREE.PerspectiveCamera(FOV, this.containerSize.width / this.containerSize.height, 0.1, 1000);
        this.camera.position.z = CAMERA_Z;
        this.viewportSize = this.getViewportSize();

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

    private getViewportSize() {
        const vFOV = THREE.MathUtils.degToRad(FOV);
        const height = 2 * Math.tan(vFOV / 2) * CAMERA_Z;
        const width = height * (this.containerSize.width / this.containerSize.height);

        return {width, height};
    }

    private getChipSize() {
        return this.viewportSize.width / (18.5);
    }

    private getHoleX(position: number): number {
        const width = this.viewportSize.width;
        const chipSize = this.getChipSize();
        const half = chipSize / 2;
        const offset = chipSize;
        const chipOffset = chipSize / 4;

        let x = 0;
        if (position < 6) {
            x = (width / 2) - offset - (chipSize + chipOffset) * position - half;
        } else if (position >= 6 && position < 12) {
            x = -offset - (chipSize + chipOffset) * (position % 6) - half;
        } else if (position >= 12 && position < 18) {
            x = -(width / 2) + offset + (chipSize + chipOffset) * (position % 6) + half;
        } else {
            x = offset + (chipSize + chipOffset) * (position % 6) - half;
        }

        return x;
    }

    private getChipY(position: number): number {
        const height = this.viewportSize.height;
        const level = this.level[position];
        const offset = this.getChipSize();
        const chipSize = this.getChipSize();
        let y = 0;
        if (position < 12) {
            y = height / 2 - chipSize / 2 - (level * chipSize) - offset;
        } else {
            y = -height / 2 + chipSize / 2 + (level * chipSize) + offset;
        }

        return y;
    }

    private getChipCoordinates(position: number): {x: number, y: number} {
        const x = this.getHoleX(position);
        const y = this.getChipY(position);
        return {x, y};
    }

    updateChips(gameChips: GameChip[]) {
        forEach(gameChips, (gameChip) => {
            this.level[gameChip.position] = isNumber(this.level[gameChip.position]) ? this.level[gameChip.position] + 1 : 0;
            const position = this.getChipCoordinates(gameChip.position);
            const color = gameChip.color === ChipColor.Black ? blackColor : whiteColor;

            const chip = new Chip({
                position,
                id: gameChip.id,
                color,
                radius: this.getChipSize()/2
            });

            this.scene.add(chip);
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