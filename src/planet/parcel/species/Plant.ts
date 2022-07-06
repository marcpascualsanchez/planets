import { Color4, Mesh } from "babylonjs";
import { createCube, getRandom } from "../../../utils";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";

export class Plant implements Token {
    parcel: Parcel;
    mesh: Mesh;
    step: number;

    constructor(parcel: Parcel) {
        this.parcel = parcel;
        this.spawn();
    }

    spawn(): void {
        this.mesh = createCube(new Color4(0, 51, 25, 1));
        this.mesh.position = this.parcel.position;
    }
}