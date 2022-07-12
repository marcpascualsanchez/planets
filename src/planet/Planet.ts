import { GoldbergCreationOption, GoldbergMesh, MeshBuilder } from "babylonjs";
import { MobileToken } from "./parcel/common/MobileToken";
import { Species } from "./parcel/common/Species";
import { Parcel } from './parcel/Parcel';

const PLANET_NAME = 'planet';

export class Planet {
    static mobileTokens: MobileToken[] = [];
    static speciesTokens: Species[] = [];

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
        Planet.speciesTokens.forEach(t => t.nourish());
    }

    static removeMobileToken(id: number) {
        Planet.mobileTokens = Planet.mobileTokens.filter(t => t.id != id);
    }

    static removeSpeciesToken(id: number) {
        Planet.speciesTokens = Planet.speciesTokens.filter(t => t.id != id);
    }
}