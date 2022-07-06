import { Parcel } from "../Parcel";

export interface Mobile {
    step: number;
    move(allParcels: Parcel[]): void;
}