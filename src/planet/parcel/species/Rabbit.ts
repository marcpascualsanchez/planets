import { Color4, Mesh } from "babylonjs";
import { createCube, getRandom } from "../../../utils";
import { Planet } from "../../Planet";
import { Mobile } from "../common/Mobile";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";

export class Rabbit implements Mobile, Token {
    parcel: Parcel;
    mesh: Mesh;
    step: number;

    constructor(parcel: Parcel) {
        this.parcel = parcel;
        this.spawn();
        Planet.mobileTokens.push(this);
    }

    move(allParcels: Parcel[]): void {
        const randomId = getRandom(this.parcel.adjacentAllotmentIds);
        this.parcel = allParcels[randomId];
        this.mesh.dispose();
        this.spawn();
    }

    spawn(): void {
        this.mesh = createCube(new Color4(204, 204, 0, 1));
        this.mesh.position = this.parcel.position;
    }
}