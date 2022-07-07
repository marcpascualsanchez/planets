import { Color4 } from "babylonjs";
import { getRandom } from "../../../utils";
import { Planet } from "../../Planet";
import { Mobile } from "../common/Mobile";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";
import { Rabbit } from "./Rabbit";

export class Wolf extends Token implements Mobile {
    step: number;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(160, 160, 160, 1));
        Planet.mobileTokens.push(this);
    }

    move(allParcels: Parcel[]): void {
        this.parcel.removeToken(this.id);
        const randomId = getRandom(this.parcel.adjacentParcelIds);
        this.parcel = allParcels[randomId];
        this.parcel.addToken(this);
        this.eat();
    }

    eat() {
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