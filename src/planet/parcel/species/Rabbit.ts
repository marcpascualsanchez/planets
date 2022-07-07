import { Color4 } from "babylonjs";
import { getRandom } from "../../../utils";
import { Planet } from "../../Planet";
import { Mobile } from "../common/Mobile";
import { Token } from "../common/Token";
import { Parcel } from "../Parcel";
import { Plant } from "./Plant";

export class Rabbit extends Token implements Mobile {
    step: number;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(204, 204, 0, 1));
        Planet.mobileTokens.push(this);
    }

    move(allParcels: Parcel[]): void {
        this.parcel.removeToken(this.id);
        const randomId = getRandom(this.parcel.adjacentParcelIds);
        this.parcel = allParcels[randomId];
        this.parcel.addToken(this);
        this.eat();
    }

    public despawn(): void {
        super.despawn();
        Planet.removeMobileToken(this.id);
    }

    // TODO: create common parent class Animal + Token that eats other tokens
    // add a new turn after move to resolve all eatings
    eat() {
        const prey = this.parcel.tokens.find(t => t instanceof Plant);
        if (!prey) {
            return;
        }
        prey.despawn();
    }
}