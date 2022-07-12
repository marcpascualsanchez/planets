import { Color4 } from "babylonjs";
import { Planet } from "../../Planet";
import { Species } from "../common/Species";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";

export class Plant extends Token implements Species {
    step: number;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(0, 51, 25, 1));
        Planet.speciesTokens.push(this);
    }

    nourish(): void {
        return;
    }
}