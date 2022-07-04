import { GoldbergCreationOption, GoldbergMesh, MeshBuilder } from "babylonjs";
import { Parcel } from './allotment/Parcel';
import { allSpecies } from "./allotment/biosphere/Species";

const PLANET_NAME = 'planet';

export class Planet {
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
        allSpecies.forEach(a => a.move(this.allParcels));
    }
}