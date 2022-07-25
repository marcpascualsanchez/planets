import { Easing, Tween } from "@tweenjs/tween.js";
import { Color4, Vector3 } from "babylonjs";
import { Game } from "../../../game/Game";
import { getRandom } from "../../../utils";
import { Planet } from "../../Planet";
import { Parcel } from "../Parcel";
import { Token } from "./Token";

export class MobileToken extends Token {
    step: number;
    animationMarginMs = 500;

    constructor(parcel: Parcel, color: Color4) {
        super(parcel, color);
        Planet.mobileTokens.push(this);
    }

    animate(initialPosition: Vector3, targetPosition: Vector3): Promise<void> {
        const duration = Game.turnTime - this.animationMarginMs;
        return new Promise(resolve => {
            new Tween({ x: initialPosition.x, y: initialPosition.y, z: initialPosition.z })
                .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, duration)
                .easing(Easing.Quadratic.Out)
                .onUpdate(({ x, y, z }) => { this.setPosition({ x, y, z }) })
                .onComplete(() => {
                    resolve();
                })
                .start();
        });
    }

    async move(allParcels: Parcel[]) {
        const randomId = getRandom(this.parcel.adjacentParcelIds);
        this.parcel.removeToken(this.id);
        const targetParcel = allParcels[randomId];
        await this.animate(this.parcel.position, targetParcel.position);
        this.parcel = targetParcel;
        this.parcel.addToken(this);
    }
}