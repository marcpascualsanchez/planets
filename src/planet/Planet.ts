import { GoldbergCreationOption, GoldbergMesh, MeshBuilder } from "babylonjs";
import { Allotment } from './allotment/Allotment';

const PLANET_NAME = 'planet';

export class Planet {
    mesh: GoldbergMesh;
    allotments: Allotment[] = [];

    constructor(options: GoldbergCreationOption) {
        this.createPlanet(options);
    }

    createPlanet(options: GoldbergCreationOption) {
        this.mesh = MeshBuilder.CreateGoldberg(PLANET_NAME, options);
        const faceAmount = this.mesh.goldbergData.nbFaces;
        for (let face = 0; face < faceAmount; face++) {
            this.allotments.push(
                new Allotment(
                    this.mesh.goldbergData.faceCenters[face],
                    this.mesh.goldbergData.adjacentFaces[face],
                ))

        }
        console.log('************  this.allotments', this.allotments);
    }

    startTurn() {
        this.allotments.forEach(a => a.move(this.allotments));
        console.log('************ turn');
    }
}