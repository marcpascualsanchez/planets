import { GoldbergCreationOption, GoldbergMesh, MeshBuilder } from "babylonjs";
import { Mobile } from "./parcel/common/Mobile";
import { Parcel } from './parcel/Parcel';

const PLANET_NAME = 'planet';

export class Planet {
    static mobileTokens: Mobile[] = [];

    mesh: GoldbergMesh;
    allParcels: Parcel[] = [];

    constructor(options: GoldbergCreationOption) {
        this.createPlanet(options);
    }

    createPlanet(options: GoldbergCreationOption) {
        this.mesh = MeshBuilder.CreateGoldberg(PLANET_NAME, options);
        const faceAmount = this.mesh.goldbergData.nbFaces;
        for (let face = 0; face < faceAmount; face++) {
            this.allParcels.push(
                new Parcel(
                    this.mesh.goldbergData.faceCenters[face],
                    this.mesh.goldbergData.adjacentFaces[face],
                ))
        }
    }

    startTurn() {
        Planet.mobileTokens.forEach(a => a.move(this.allParcels));
    }
}