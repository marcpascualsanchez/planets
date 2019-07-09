import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class SkyBoxComponent {
    skyBox;
    helper;
    size: {
        width: 1000,
        height: 1000,
        depth: 1000,
    };
    assetPath = '../../assets/skyboxes/galaxybox2/box2';


    constructor() {
        const geometry = new THREE.BoxGeometry(1000,1000,1000);
        
        this.skyBox = new THREE.Mesh(geometry, this.loadMaterials());
    }

    loadMaterials() {
        const textures = [
            new THREE.TextureLoader().load(`${this.assetPath}/SkyboxX+.png`), // xBack
            new THREE.TextureLoader().load(`${this.assetPath}/SkyboxX-.png`), // xFront
            new THREE.TextureLoader().load(`${this.assetPath}/SkyboxY+.png`), // yBack
            new THREE.TextureLoader().load(`${this.assetPath}/SkyboxY-.png`), // yFront
            new THREE.TextureLoader().load(`${this.assetPath}/SkyboxZ+.png`), // zBack
            new THREE.TextureLoader().load(`${this.assetPath}/SkyboxZ-.png`), // zFront
        ];
        const materials = [];

        for(let i = 0; i < textures.length; i++){
            materials[i] = new THREE.MeshBasicMaterial({ map: textures[i], side: THREE.BackSide });
        }

        return materials;
    }

    getSkyBox() {
        return this.skyBox;
    }

}
