import { Color4, Vector3 } from "babylonjs";
import { Planet } from "../../Planet";
import { MobileToken } from "../common/MobileToken";
import { Species } from "../common/Species";
import { Parcel } from "../Parcel";
import { Plant } from "./Plant";

export class Rabbit extends MobileToken implements Species {
    step: number;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(204, 204, 0, 1));
        Planet.speciesTokens.push(this);
    }

    public despawn(): void {
        super.despawn();
        Planet.removeMobileToken(this.id);
    }

    nourish(): void {
        const prey = this.parcel.tokens.find(t => t instanceof Plant);
        if (!prey) {
            return;
        }
        prey.despawn();
    }
}