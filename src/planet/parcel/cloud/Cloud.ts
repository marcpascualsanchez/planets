import { Color4 } from "babylonjs";
import { Planet } from "../../Planet";
import { MobileToken } from "../common/MobileToken";
import { Parcel } from "../Parcel";

const distanceFromGroundFactor = 1.5;

export class Cloud extends MobileToken {
    step: number;
    opacity = 0.3;

    constructor(parcel: Parcel) {
        super(parcel, new Color4(169, 169, 169, 0));
        Planet.cloudTokens.push(this);
        this.mesh.material.alpha = this.opacity;
    }

    public setPosition(position: { x: number, y: number, z: number }): void {
        this.mesh.position.x = position.x * distanceFromGroundFactor;
        this.mesh.position.y = position.y * distanceFromGroundFactor;
        this.mesh.position.z = position.z * distanceFromGroundFactor;
    }
}