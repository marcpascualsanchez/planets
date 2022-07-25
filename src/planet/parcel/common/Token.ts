import { Color4, Mesh } from 'babylonjs';
import { Game } from '../../../game/Game';
import { createCube } from '../../../utils';
import { Parcel } from '../Parcel';

/**
 * Every part present in a {@link Parcel} is a {@link Token}. Each one has a 3D {@link Mesh} and interacts with other tokens.
 */
export class Token {
    public id: number;
    public parcel: Parcel;
    protected mesh: Mesh;
    protected color: Color4;

    constructor(parcel: Parcel, color: Color4) {
        this.parcel = parcel;
        this.color = color;
        this.id = Game.getId();
        this.spawn();
    }

    public spawn(): void {
        if (this.mesh) {
            this.mesh.dispose();
        }
        this.mesh = createCube(this.color);
        this.setPosition(this.parcel.position);
    }

    public setPosition(position: { x: number, y: number, z: number }): void {
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
        this.mesh.position.z = position.z;
    }

    public despawn(): void {
        this.mesh.dispose();
    }
}