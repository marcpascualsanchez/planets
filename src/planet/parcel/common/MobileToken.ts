import { Easing, Tween } from "@tweenjs/tween.js";
import { Color4, Vector3 } from "babylonjs";
import { Game } from "../../../game/Game";
import { getRandom } from "../../../utils";
import { Planet } from "../../Planet";
import { Parcel } from "../Parcel";
import { Token } from "./Token";

export class MobileToken extends Token {
    step: number;

    constructor(parcel: Parcel, color: Color4) {
        super(parcel, color);
        Planet.mobileTokens.push(this);
    }

    animate(initialPosition: Vector3, targetPosition: Vector3) {
        const duration = Game.turnTime - 500;
        new Tween({ x: initialPosition.x, y: initialPosition.y, z: initialPosition.z })
            .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, duration)
            .easing(Easing.Quadratic.Out)
            .onUpdate(({ x, y, z }) => {
                this.mesh.position.x = x;
                this.mesh.position.y = y;
                this.mesh.position.z = z;
            })
            .start();
    }

    // TODO: maybe adjacentParcelIds don't work well in some cases (animation goes trough planet)
    move(allParcels: Parcel[]): void {
        const randomId = getRandom(this.parcel.adjacentParcelIds);
        this.parcel.removeToken(this.id);
        const targetParcel = allParcels[randomId];
        this.animate(this.parcel.position, targetParcel.position);
        this.parcel = targetParcel;
        this.parcel.addToken(this);
    }
}