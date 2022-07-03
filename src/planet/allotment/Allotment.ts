import { Vector3 } from "babylonjs";
import { Atmosphere } from "./atmosphere/Atmosphere";
import { Biosphere } from "./biosphere/Biosphere";

export class Allotment {
    position: Vector3;
    adjacentAllotmentIds: number[];
    biosphere: Biosphere;
    atmosphere: Atmosphere;

    constructor(position: Vector3, adjacentFaceIds: number[]) {
        this.position = position;
        this.adjacentAllotmentIds = adjacentFaceIds;
        this.biosphere = new Biosphere(position);
        this.atmosphere = new Atmosphere();
    }

    move(allAllotments: Allotment[]) {
        this.biosphere.move(allAllotments, this.adjacentAllotmentIds);
        this.atmosphere.move();
    }
}