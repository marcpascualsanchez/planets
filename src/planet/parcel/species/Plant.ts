import { Color4 } from "babylonjs";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";

export class Plant extends Token {
    step: number;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(0, 51, 25, 1));
    }
}