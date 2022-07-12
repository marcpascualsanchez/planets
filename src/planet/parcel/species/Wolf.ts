import { Color4 } from "babylonjs";
import { getRandom } from "../../../utils";
import { Planet } from "../../Planet";
import { MobileToken } from "../common/MobileToken";
import { Species } from "../common/Species";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";
import { Rabbit } from "./Rabbit";

export class Wolf extends MobileToken implements Species {
    step: number;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(160, 160, 160, 1));
        Planet.speciesTokens.push(this);
    }

    nourish(): void {
        const prey = this.parcel.tokens.find(t => t instanceof Rabbit);
        if (!prey) {
            return;
        }
        prey.despawn();
    }

    public despawn(): void {
        super.despawn();
        Planet.removeMobileToken(this.id);
    }
}