import { MeshBuilder, Vector3 } from "babylonjs";
import { Species as Species } from "./biosphere/Species";

export class Parcel {
    position: Vector3;
    adjacentAllotmentIds: number[];
    species: Species;

    constructor(position: Vector3, adjacentFaceIds: number[]) {
        this.position = position;
        this.adjacentAllotmentIds = adjacentFaceIds;
        this.species = new Species(this);
    }
}