import { Mesh } from 'babylonjs';
import { Parcel } from '../Parcel';

/**
 * Every part present in a {@link Parcel} is a {@link Token}. Each one has a 3D {@link Mesh} and interacts with other tokens.
 */
export interface Token {
    parcel: Parcel;
    mesh: Mesh;

    spawn(): void;
}